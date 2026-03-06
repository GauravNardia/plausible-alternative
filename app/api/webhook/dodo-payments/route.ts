import { db } from "@/database/drizzle"
import { pricingTiers, subscriptions } from "@/database/schema"
import { PRODUCT_ID_TO_TIER } from "@/constants"
import { eq, and } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { Webhook } from "standardwebhooks"

const webhookSecret = process.env.DODO_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const webhookId = req.headers.get("webhook-id")
    const webhookSignature = req.headers.get("webhook-signature")
    const webhookTimestamp = req.headers.get("webhook-timestamp")

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      return NextResponse.json({ error: "Missing webhook headers" }, { status: 400 })
    }

    const body = await req.text()
    const webhook = new Webhook(webhookSecret)

    try {
      await webhook.verify(body, {
        "webhook-id": webhookId,
        "webhook-signature": webhookSignature,
        "webhook-timestamp": webhookTimestamp,
      })
    } catch (err) {
      console.error("Webhook verification failed:", err)
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
    }

    const payload = JSON.parse(body)
    const data = payload.data

    switch (payload.type) {

      case "subscription.active": {
        const productId = data.product_id ?? data.product_cart?.[0]?.product_id
        const metadataUserId = data.metadata?.userId

        if (!metadataUserId) { console.log("Missing userId in metadata"); break }
        if (!productId) { console.log("Missing productId"); break }

        // Get tier info from constants
        const tierInfo = PRODUCT_ID_TO_TIER[productId]
        if (!tierInfo) { console.log("Unknown product:", productId); break }

        // Find matching row in pricing_tiers by name + limit
        const [tier] = await db.select().from(pricingTiers)
          .where(and(
            eq(pricingTiers.name, tierInfo.name),
            eq(pricingTiers.monthlyEventLimit, tierInfo.monthlyEventLimit)
          )).limit(1)

        if (!tier) { console.log("Tier not found in DB:", tierInfo); break }

        // Skip if already saved
        const [existing] = await db.select().from(subscriptions)
          .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))
          .limit(1)
        if (existing) { console.log("Already exists, skipping"); break }

        await db.insert(subscriptions).values({
          userId: metadataUserId,
          pricingTierId: tier.id,
          status: "active",
          dodoCustomerId: data.customer?.customer_id,
          dodoSubscriptionId: data.subscription_id,
          currentPeriodStart: new Date(data.created_at),
          currentPeriodEnd: new Date(data.next_billing_date),
        })

        console.log("✅ Subscription saved:", tierInfo.name, tierInfo.monthlyEventLimit)
        break
      }

      case "payment.succeeded": {
        if (!data.subscription_id) break
        await db.update(subscriptions)
          .set({ status: "active", currentPeriodEnd: new Date(data.next_billing_date) })
          .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))
        console.log("✅ Subscription renewed")
        break
      }

      case "payment.failed": {
        await db.update(subscriptions)
          .set({ status: "past_due" })
          .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))
        break
      }

      case "subscription.cancelled": {
        await db.update(subscriptions)
          .set({ status: "cancelled" })
          .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))
        break
      }

      case "subscription.updated": {
        const productId = data.product_id ?? data.product_cart?.[0]?.product_id
        const tierInfo = PRODUCT_ID_TO_TIER[productId]

        if (tierInfo) {
          const [tier] = await db.select().from(pricingTiers)
            .where(and(
              eq(pricingTiers.name, tierInfo.name),
              eq(pricingTiers.monthlyEventLimit, tierInfo.monthlyEventLimit)
            )).limit(1)

          if (tier) {
            await db.update(subscriptions)
              .set({ pricingTierId: tier.id, currentPeriodEnd: new Date(data.next_billing_date) })
              .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))
            break
          }
        }

        await db.update(subscriptions)
          .set({ currentPeriodEnd: new Date(data.next_billing_date) })
          .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))
        break
      }

      default:
        console.log("Unhandled event:", payload.type)
    }

    return NextResponse.json({ received: true, type: payload.type }, { status: 200 })

  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
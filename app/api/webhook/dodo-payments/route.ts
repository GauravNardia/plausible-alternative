import { db } from "@/database/drizzle";
import { pricingTiers, subscriptions, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";


const PRODUCT_TO_TIER: Record<string, string> = {
  "pdt_0NZk2m2ihnDFGSAkvCHMu": "starter",
  "pdt_0NZk32m4w1T3vZG91zrzJ":  "growth",
  "pdt_0NZk38v6WsCPiOzLvlI4a":   "scale",
}

const webhookSecret = process.env.DODO_WEBHOOK_SECRET!;


export async function POST(req: NextRequest) {
  try {
    const webhookId = req.headers.get("webhook-id")
    const webhookSignature = req.headers.get("webhook-signature")
    const webhookTimestamp = req.headers.get("webhook-timestamp")

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      return NextResponse.json(
        { error: "Missing webhook headers" },
        { status: 400 }
      )
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

      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      )
    }

    const payload = JSON.parse(body)
    const data = payload.data

    switch (payload.type) {

case "payment.processing": {

  const email = data.customer?.email

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user.length) break

  const tier = await db
    .select()
    .from(pricingTiers)
    .where(eq(pricingTiers.name, "starter"))
    .limit(1)

  await db.insert(subscriptions).values({
    userId: user[0].id,
    pricingTierId: tier[0].id,
    status: "active",
    dodoSubscriptionId: data.subscription_id,
    currentPeriodStart: new Date(data.created_at),
    currentPeriodEnd: new Date(data.next_billing_date),  
  })

  console.log("Inserted subscription")
}
break

      /* =========================
         PAYMENT SUCCEEDED
      ========================== */

case "payment.succeeded": {
  console.log("Payment succeeded:", data)

  const email = data.customer?.email
  const productId = data.product_id
  const subscriptionId = data.subscription_id
  const customerId = data.customer?.customer_id

  if (!email) {
    console.log("Missing email")
    break
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user.length) {
    console.log("User not found:", email)
    break
  }

  const userId = user[0].id

  const tierName = PRODUCT_TO_TIER[productId]

  if (!tierName) {
    console.log("Unknown product:", productId)
    break
  }

  const tier = await db
    .select()
    .from(pricingTiers)
    .where(eq(pricingTiers.name, tierName))
    .limit(1)

  if (!tier.length) {
    console.log("Tier not found:", tierName)
    break
  }

  const pricingTierId = tier[0].id

  const existing = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.dodoSubscriptionId, subscriptionId))
    .limit(1)

  if (existing.length) {
    console.log("Subscription already exists")
    break
  }

  await db.insert(subscriptions).values({
    userId,
    pricingTierId,
    status: "active",
    currentPeriodStart: new Date(data.created_at),
    currentPeriodEnd: new Date(data.next_billing_date),
    dodoCustomerId: customerId,
    dodoSubscriptionId: subscriptionId,
  })

  console.log("✅ Subscription saved")

  break
}

case "subscription.active": {
  const email = data.customer?.email
  const productId = data.product_id ?? data.product_cart?.[0]?.product_id ?? null
  const subscriptionId = data.subscription_id
  const customerId = data.customer?.customer_id
  const metadataUserId = data.metadata?.userId

if (!metadataUserId) {
  console.log("Missing userId in metadata")
  break
}

  if (!email) {
    console.log("Missing email")
    break
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user.length) {
    console.log("User not found:", email)
    break
  }

  const tierName = PRODUCT_TO_TIER[productId]

  if (!tierName) {
    console.log("Unknown product:", productId)
    break
  }

  const tier = await db
    .select()
    .from(pricingTiers)
    .where(eq(pricingTiers.name, tierName))
    .limit(1)

  if (!tier.length) {
    console.log("Tier not found:", tierName)
    break
  }

  const pricingTierId = tier[0].id

  const existing = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.dodoSubscriptionId, subscriptionId))
    .limit(1)

  if (existing.length) {
    console.log("Subscription already exists")
    break
  }

  await db.insert(subscriptions).values({
    userId: metadataUserId,
    pricingTierId,
    status: data.status,
    currentPeriodStart: new Date(data.created_at),
    currentPeriodEnd: new Date(data.next_billing_date),
    dodoCustomerId: customerId,
    dodoSubscriptionId: subscriptionId,
  })

  console.log("✅ Subscription inserted")

  break
}

      /* =========================
         PAYMENT FAILED
      ========================== */

      case "payment.failed":
        console.log("Payment failed:", data)
        break

      /* =========================
         SUBSCRIPTION CANCELLED
      ========================== */

      case "subscription.cancelled": {
        console.log("Subscription cancelled:", data)

        await db
          .update(subscriptions)
          .set({ status: "cancelled" })
          .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))

        break
      }

      /* =========================
         SUBSCRIPTION UPDATED
      ========================== */

      case "subscription.updated": {
        console.log("Subscription updated:", data)

        await db
          .update(subscriptions)
          .set({
            currentPeriodEnd: new Date(data.next_billing_date),
          })
          .where(eq(subscriptions.dodoSubscriptionId, data.subscription_id))

        break
      }

      default:
        console.log("Unhandled webhook event:", payload.type)
    }

    return NextResponse.json(
      { received: true, type: payload.type },
      { status: 200 }
    )

  } catch (error) {
    console.error("Webhook processing error:", error)

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
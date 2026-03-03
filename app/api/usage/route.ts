import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { subscriptions, pricingTiers, monthlyUsage, sites } from "@/database/schema"
import { eq, and } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
  }

  // 1️⃣ Get site
  const site = await db
    .select()
    .from(sites)
    .where(eq(sites.id, siteId))
    .then(res => res[0])

  if (!site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 })
  }

  // 2️⃣ Get active subscription
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, site.userId),
        eq(subscriptions.status, "active")
      )
    )
    .then(res => res[0])

  if (!subscription) {
    return NextResponse.json({ error: "No active subscription" }, { status: 403 })
  }

  // 3️⃣ Get pricing tier
  const tier = await db
    .select()
    .from(pricingTiers)
    .where(eq(pricingTiers.id, subscription.pricingTierId))
    .then(res => res[0])

  if (!tier) {
    return NextResponse.json({ error: "Tier not found" }, { status: 404 })
  }

  // 4️⃣ Get monthly usage
  const month = new Date().toISOString().slice(0, 7)

  const usage = await db
    .select()
    .from(monthlyUsage)
    .where(
      and(
        eq(monthlyUsage.userId, site.userId),
        eq(monthlyUsage.month, month)
      )
    )
    .then(res => res[0])

  const used = usage?.eventsCount ?? 0
  const limit = tier.monthlyEventLimit
  const planName = tier.name;

  return NextResponse.json({
    used,
    limit,
    percentage: Math.round((used / limit) * 100),
    planName

  })
}
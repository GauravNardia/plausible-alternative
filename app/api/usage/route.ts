import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { subscriptions, pricingTiers, monthlyUsage, sites } from "@/database/schema"
import { eq, and } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  let userId = searchParams.get("userId")
  const siteId = searchParams.get("siteId")

    // If siteId provided, get userId from it
  if (siteId && !userId) {
    const site = await db
      .select({ userId: sites.userId })
      .from(sites)
      .where(eq(sites.id, siteId))
      .then(res => res[0])

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 })
    }
    userId = site.userId
  }

  if (!userId) {
    return NextResponse.json({ error: "Missing userId or siteId" }, { status: 400 })
  }

  // 2️⃣ Get active subscription
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active")
      )
    )
    .then(res => res[0])

if (!subscription) {
  return NextResponse.json({
    used: 0,
    limit: 0,
    maxsites: 0,
    percentage: 0,
    planName: null,
    hasSubscription: false,
  })
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
        eq(monthlyUsage.userId, userId),
        eq(monthlyUsage.month, month)
      )
    )
    .then(res => res[0])

  const used = usage?.eventsCount ?? 0
  const limit = tier.monthlyEventLimit
  const maxsites = tier.maxSites;
  const planName = tier.name;

return NextResponse.json({
  used,
  limit,
  maxsites,
  percentage: Math.round((used / limit) * 100),
  planName,
  hasSubscription: true,
})
}
import { NextResponse } from "next/server"
import { sites, events } from "@/database/schema"
import { eq } from "drizzle-orm"
import { db } from "@/database/drizzle"
import { getActiveSubscription, getPricingTier } from "@/lib/actions/billing.action"
import { checkMonthlyLimit, incrementUsage } from "@/lib/actions/usage.action"


export async function POST(req: Request) {
  const body = await req.json()
  const { apiKey, path, visitorHash } = body

  // 1️⃣ Find site
  const siteResult = await db
    .select()
    .from(sites)
    .where(eq(sites.publicApiKey, apiKey))

  const site = siteResult[0]

  if (!site)
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })

  // 2️⃣ Get subscription
  const subscription = await getActiveSubscription(site.userId)

  if (!subscription || subscription.status !== "active")
    return NextResponse.json({ error: "No active subscription" }, { status: 402 })

  // 3️⃣ Get tier
  const tier = await getPricingTier(subscription.pricingTierId)

  if (!tier)
    return NextResponse.json({ error: "Invalid pricing tier" }, { status: 500 })

  // 4️⃣ Check monthly usage
  const allowed = await checkMonthlyLimit(site.userId, tier.monthlyEventLimit)

  if (!allowed)
    return NextResponse.json({ error: "Monthly limit reached" }, { status: 402 })

  // 5️⃣ Insert event
  await db.insert(events).values({
    siteId: site.id,
    path,
    visitorHash,
  })

  // 6️⃣ Increment usage
  await incrementUsage(site.userId)

  return NextResponse.json({ success: true })
}
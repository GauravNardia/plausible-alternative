import { NextResponse } from "next/server"
import {
  pricingTiers,
  subscriptions,
  users,
  sites,
  monthlyUsage,
} from "@/database/schema"
import { eq } from "drizzle-orm"
import { db } from "@/database/drizzle"

export async function GET() {
  // 1️⃣ Get first user
  const userResult = await db.select().from(users)
  const user = userResult[0]

  if (!user) {
    return NextResponse.json({ error: "No user found" })
  }

  // 2️⃣ Get first site
  const siteResult = await db.select().from(sites)
  const site = siteResult[0]

  if (!site) {
    return NextResponse.json({ error: "No site found" })
  }

  // 3️⃣ Create test pricing tier (limit = 5)
  const tier = await db.insert(pricingTiers).values({
    name: "Test-5-Limit",
    monthlyEventLimit: 5,
    maxSites: 1,
    priceMonthly: 700,
  }).returning()

  const tierId = tier[0].id

  // 4️⃣ Remove old subscriptions
  await db.delete(subscriptions).where(eq(subscriptions.userId, user.id))

  // 5️⃣ Create active subscription
  await db.insert(subscriptions).values({
    userId: user.id,
    pricingTierId: tierId,
    status: "active",
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })

  // 6️⃣ Clear monthly usage
  await db.delete(monthlyUsage)

  return NextResponse.json({
    message: "Test setup complete",
    siteApiKey: site.publicApiKey,
    userId: user.id,
  })
}
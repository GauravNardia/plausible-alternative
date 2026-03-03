import { db } from "@/database/drizzle"
import { sites, subscriptions, pricingTiers } from "@/database/schema"
import { generatePublicApiKey } from "@/lib/api-key"
import { eq, and } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, domain, userId } = body

    if (!name || !domain || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    /* ================= CHECK ACTIVE SUBSCRIPTION ================= */

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
      return NextResponse.json(
        { error: "No active subscription" },
        { status: 403 }
      )
    }

    /* ================= GET PRICING TIER ================= */

    const tier = await db
      .select()
      .from(pricingTiers)
      .where(eq(pricingTiers.id, subscription.pricingTierId))
      .then(res => res[0])

    if (!tier) {
      return NextResponse.json(
        { error: "Pricing tier not found" },
        { status: 404 }
      )
    }

    /* ================= CHECK SITE LIMIT ================= */

    const existingSites = await db
      .select()
      .from(sites)
      .where(eq(sites.userId, userId))

    if (existingSites.length >= tier.maxSites) {
      return NextResponse.json(
        { error: "Site limit reached for your plan" },
        { status: 402 }
      )
    }

    /* ================= CREATE SITE ================= */

    const apiKey = generatePublicApiKey()

    const newSite = await db
      .insert(sites)
      .values({
        name,
        userId,
        domain,
        publicApiKey: apiKey,
      })
      .returning()

    return NextResponse.json(newSite[0])

  } catch (error) {
    console.error("Create site error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/* ================= GET USER SITES ================= */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId" },
      { status: 400 }
    )
  }

  const userSites = await db
    .select()
    .from(sites)
    .where(eq(sites.userId, userId))

  return NextResponse.json(userSites)
}
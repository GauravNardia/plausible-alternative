import { and, eq, gt, sql } from "drizzle-orm"
import { NextResponse } from "next/server"
import { generateVisitorHash } from "@/lib/hash"
import { parseUA } from "@/lib/ua"
import { db } from "@/database/drizzle"
import { events, monthlyUsage, pricingTiers, sites, subscriptions } from "@/database/schema"
import { isBot } from "@/lib/boat"
import { eventSchema } from "@/lib/validations"
import { getGeo } from "@/lib/geo"

export async function POST(req: Request) {
try {
    const body = eventSchema.parse(await req.json())
  
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "0.0.0.0"
    const { country, region, city } = getGeo(req)
  
  
  
  if (isBot(body.ua)) {
     return new NextResponse(null, { status: 204 })
  }
  
    const site = await db
      .select({ id: sites.id, userId: sites.userId })
      .from(sites)
      .where(eq(sites.publicApiKey, body.apiKey))
      .limit(1)
  
    if (!site.length) {
      return new NextResponse(null, { status: 404 })
    }
  
    const siteId = site[0].id
    const userId = site[0].userId
  
      /* 2️⃣ Get active subscription */
      const subResult = await db
        .select({
          monthlyEventLimit: pricingTiers.monthlyEventLimit,
        })
        .from(subscriptions)
        .innerJoin(
          pricingTiers,
          eq(subscriptions.pricingTierId, pricingTiers.id)
        )
        .where(
          and(
            eq(subscriptions.userId, userId),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1)
  
      if (!subResult.length) {
        return new NextResponse(null, { status: 402 })
      }
  
      const monthlyLimit = subResult[0].monthlyEventLimit
  
      /* 3️⃣ Check monthly usage */
  
      const month = new Date().toISOString().slice(0, 7)
  
      const usage = await db
        .select()
        .from(monthlyUsage)
        .where(
          and(
            eq(monthlyUsage.userId, userId),
            eq(monthlyUsage.month, month),
            gt(subscriptions.currentPeriodEnd, new Date())
          )
        )
        .limit(1)
  
      const eventsCount = usage[0]?.eventsCount ?? 0
  
      if (eventsCount >= monthlyLimit) {
        return new NextResponse(null, { status: 402 })
      }
  
  
    const visitorHash = generateVisitorHash(ip, body.ua)
    const { browser, os, device } = parseUA(body.ua)
  
    await db.transaction(async (tx) => {
  
      // 1. Insert into daily_visitors
    const insertVisitor = await tx.execute(sql`
      INSERT INTO daily_visitors (site_id, date, visitor_hash)
      VALUES (${siteId}, CURRENT_DATE, ${visitorHash})
      ON CONFLICT DO NOTHING
      RETURNING 1
    `)
  
    const isNew = insertVisitor.rowCount !== null && insertVisitor.rowCount > 0
  
      // 2. Insert raw event
      await tx.insert(events).values({
        siteId,
        path: body.path,
        referrer: body.referrer,
        browser,
        os,
        device,
        visitorHash,
        country,
        region,
        city
      })
  
      //  3. update daily_stats
      await tx.execute(sql`
        INSERT INTO daily_stats (site_id, date, pageviews, unique_visitors)
        VALUES (${siteId}, CURRENT_DATE, 1, ${isNew ? 1 : 0})
        ON CONFLICT (site_id, date)
        DO UPDATE SET
          pageviews = daily_stats.pageviews + 1,
          unique_visitors = daily_stats.unique_visitors + ${isNew ? 1 : 0}
      `)
  
      // 4. update page_stats
      await tx.execute(sql`
        INSERT INTO page_stats (site_id, date, path, pageviews)
        VALUES (${siteId}, CURRENT_DATE, ${body.path}, 1)
        ON CONFLICT (site_id, date, path)
        DO UPDATE SET
          pageviews = page_stats.pageviews + 1
      `)
  
        /* increment monthly usage */
  
        await tx
          .insert(monthlyUsage)
          .values({
            userId,
            month,
            eventsCount: 1,
          })
          .onConflictDoUpdate({
            target: [monthlyUsage.userId, monthlyUsage.month],
            set: {
              eventsCount: sql`${monthlyUsage.eventsCount} + 1`,
            },
          })
      })
  
    return new NextResponse(null, { status: 204 })
} catch (error) {
    console.error("Track error:", error)
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}
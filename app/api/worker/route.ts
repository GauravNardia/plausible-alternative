import { db } from "@/database/drizzle"
import { events, monthlyUsage, pricingTiers, sites, subscriptions } from "@/database/schema"
import { redis } from "@/lib/config/redis"
import { generateVisitorHash } from "@/lib/hash"
import { parseUA } from "@/lib/ua"
import { and, eq, gt, inArray, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get("secret")
  
  if (secret !== process.env.WORKER_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

    // pull upto 500 event from redis
    const QUEUE = process.env.REDIS_QUEUE_NAME!
    const raw = await redis.lrange(QUEUE, 0, 499)
    if (raw.length === 0) return NextResponse.json({ processed: 0 })
    
    // remove pulled event from queue
    await redis.ltrim(QUEUE, raw.length, -1)

    // parse
    const parsed = raw.map(e => typeof e === "string" ? JSON.parse(e) : e)
    let processed = 0

      for (const body of parsed) {
    try {
      // Get site
      const site = await db
        .select({ id: sites.id, userId: sites.userId })
        .from(sites)
        .where(eq(sites.publicApiKey, body.apiKey))
        .limit(1)

      if (!site.length) continue

      const siteId = site[0].id
      const userId = site[0].userId

      // Check subscription
      const subResult = await db
        .select({ monthlyEventLimit: pricingTiers.monthlyEventLimit })
        .from(subscriptions)
        .innerJoin(pricingTiers, eq(subscriptions.pricingTierId, pricingTiers.id))
        .where(
          and(
            eq(subscriptions.userId, userId),
            inArray(subscriptions.status, ["active", "trialing"]),
            gt(subscriptions.currentPeriodEnd, new Date())
          )
        )
        .limit(1)

      if (!subResult.length) continue

      // Check monthly limit
      const month = new Date().toISOString().slice(0, 7)
      const usage = await db
        .select()
        .from(monthlyUsage)
        .where(and(eq(monthlyUsage.userId, userId), eq(monthlyUsage.month, month)))
        .limit(1)

      if ((usage[0]?.eventsCount ?? 0) >= subResult[0].monthlyEventLimit) continue

      // Process event
      const visitorHash = generateVisitorHash(body.ip, body.ua)
      const { browser, os, device } = parseUA(body.ua)

      await db.transaction(async (tx) => {
        const insertVisitor = await tx.execute(sql`
          INSERT INTO daily_visitors (site_id, date, visitor_hash)
          VALUES (${siteId}, CURRENT_DATE, ${visitorHash})
          ON CONFLICT DO NOTHING
          RETURNING 1
        `)

        const isNew = insertVisitor.rowCount !== null && insertVisitor.rowCount > 0

        await tx.insert(events).values({
          siteId,
          path: body.path,
          referrer: body.referrer,
          browser,
          os,
          device,
          visitorHash,
          country: body.country ?? null,
          region: body.region ?? null,
          city: body.city ?? null,
        })

        await tx.execute(sql`
          INSERT INTO daily_stats (site_id, date, pageviews, unique_visitors)
          VALUES (${siteId}, CURRENT_DATE, 1, ${isNew ? 1 : 0})
          ON CONFLICT (site_id, date)
          DO UPDATE SET
            pageviews = daily_stats.pageviews + 1,
            unique_visitors = daily_stats.unique_visitors + ${isNew ? 1 : 0}
        `)

        await tx.execute(sql`
          INSERT INTO page_stats (site_id, date, path, pageviews)
          VALUES (${siteId}, CURRENT_DATE, ${body.path}, 1)
          ON CONFLICT (site_id, date, path)
          DO UPDATE SET pageviews = page_stats.pageviews + 1
        `)

        await tx
          .insert(monthlyUsage)
          .values({ userId, month, eventsCount: 1 })
          .onConflictDoUpdate({
            target: [monthlyUsage.userId, monthlyUsage.month],
            set: { eventsCount: sql`${monthlyUsage.eventsCount} + 1` },
          })
      })

      processed++
    } catch (err) {
      console.error("Worker error:", err)
      continue
    }
  }

  return NextResponse.json({ processed })
}
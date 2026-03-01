import { eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"
import { generateVisitorHash } from "@/lib/hash"
import { parseUA } from "@/lib/ua"
import { db } from "@/database/drizzle"
import { events, sites } from "@/database/schema"

export async function POST(req: Request) {
  const body = await req.json()

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ?? "0.0.0.0"

  const site = await db
    .select({ id: sites.id })
    .from(sites)
    .where(eq(sites.domain, body.domain))
    .limit(1)

  if (!site.length) {
    return new NextResponse(null, { status: 404 })
  }

  const siteId = site[0].id

  const visitorHash = generateVisitorHash(ip, body.ua)
  const { browser, os, device } = parseUA(body.ua)

  await db.transaction(async (tx) => {
        const existing = await tx.execute(sql`
      SELECT 1 FROM events
      WHERE site_id = ${siteId}
      AND visitor_hash = ${visitorHash}
      AND created_at::date = CURRENT_DATE
      LIMIT 1
    `)

    const isNew = existing.rows.length === 0
    
    await tx.insert(events).values({
      siteId,
      path: body.path,
      referrer: body.referrer,
      browser,
      os,
      device,
      visitorHash,
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
      DO UPDATE SET
        pageviews = page_stats.pageviews + 1
    `)
  })

  return new NextResponse(null, { status: 204 })
}
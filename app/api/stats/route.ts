
import { db } from "@/database/drizzle"
import { eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
  }

  const overview = await db.execute(sql`
    SELECT date, pageviews, unique_visitors
    FROM daily_stats
    WHERE site_id = ${siteId}
    ORDER BY date ASC
  `)

  const topPages = await db.execute(sql`
    SELECT path, SUM(pageviews) as total
    FROM page_stats
    WHERE site_id = ${siteId}
    GROUP BY path
    ORDER BY total DESC
    LIMIT 10
  `)

  return NextResponse.json({
    overview: overview.rows,
    topPages: topPages.rows,
  })
}
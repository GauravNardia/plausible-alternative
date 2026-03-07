import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { sql } from "drizzle-orm"

function sanitizeTz(tz: string | null): string {
  if (!tz) return "UTC"
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
    return tz
  } catch {
    return "UTC"
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const siteId = searchParams.get("siteId")
    const filter = searchParams.get("filter") ?? "today"
    const tz     = sanitizeTz(searchParams.get("tz"))

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    }

    let whereClause: string

    switch (filter) {
      case "today":
        whereClause = `created_at >= DATE_TRUNC('day', NOW() AT TIME ZONE '${tz}') AT TIME ZONE '${tz}'
                   AND created_at <  DATE_TRUNC('day', NOW() AT TIME ZONE '${tz}') AT TIME ZONE '${tz}' + INTERVAL '1 day'`
        break
      case "yesterday":
        whereClause = `created_at >= DATE_TRUNC('day', NOW() AT TIME ZONE '${tz}') AT TIME ZONE '${tz}' - INTERVAL '1 day'
                   AND created_at <  DATE_TRUNC('day', NOW() AT TIME ZONE '${tz}') AT TIME ZONE '${tz}'`
        break
      case "7d":   whereClause = `created_at >= NOW() - INTERVAL '7 days'`;   break
      case "30d":  whereClause = `created_at >= NOW() - INTERVAL '30 days'`;  break
      case "180d": whereClause = `created_at >= NOW() - INTERVAL '180 days'`; break
      case "365d": whereClause = `created_at >= NOW() - INTERVAL '365 days'`; break
      default:     whereClause = `1=1`
    }

    const result = await db.execute(sql`
      SELECT
        COUNT(*)                    AS total_pageviews,
        COUNT(DISTINCT visitor_hash) AS unique_visitors
      FROM events
      WHERE
        site_id = ${siteId}
        AND ${sql.raw(whereClause)}
    `)

    const row            = result.rows[0] as any
    const totalPageviews = Number(row?.total_pageviews ?? 0)
    const uniqueVisitors = Number(row?.unique_visitors  ?? 0)
    const totalVisits    = totalPageviews
    const viewsPerVisit  = uniqueVisitors > 0
      ? (totalPageviews / uniqueVisitors).toFixed(2)
      : "0.00"

    return NextResponse.json({ totalPageviews, uniqueVisitors, totalVisits, viewsPerVisit })

  } catch (err) {
    console.error("Metrics API error:", err)
    return NextResponse.json(
      { totalPageviews: 0, uniqueVisitors: 0, totalVisits: 0, viewsPerVisit: "0.00" },
      { status: 500 }
    )
  }
}
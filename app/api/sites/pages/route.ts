import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { pageStats } from "@/database/schema"
import { and, eq, gte, lt, sql } from "drizzle-orm"

function getDateFilter(filter: string) {
  switch (filter) {
    case "today":     return gte(pageStats.date, new Date().toISOString().slice(0, 10))
    case "yesterday": {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      return eq(pageStats.date, d.toISOString().slice(0, 10))
    }
    case "7d":   return gte(pageStats.date, new Date(Date.now() - 7   * 86400000).toISOString().slice(0, 10))
    case "30d":  return gte(pageStats.date, new Date(Date.now() - 30  * 86400000).toISOString().slice(0, 10))
    case "180d": return gte(pageStats.date, new Date(Date.now() - 180 * 86400000).toISOString().slice(0, 10))
    case "365d": return gte(pageStats.date, new Date(Date.now() - 365 * 86400000).toISOString().slice(0, 10))
    default:     return undefined
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const siteId = searchParams.get("siteId")
    const filter = searchParams.get("filter") ?? "today"

    if (!siteId) return NextResponse.json({ data: [] })

    const dateFilter = getDateFilter(filter)

    const where = dateFilter
      ? and(eq(pageStats.siteId, siteId), dateFilter)
      : eq(pageStats.siteId, siteId)

    const result = await db
      .select({
        path: pageStats.path,
        visitors: sql<number>`SUM(${pageStats.pageviews})`
      })
      .from(pageStats)
      .where(where)
      .groupBy(pageStats.path)
      .orderBy(sql`SUM(${pageStats.pageviews}) DESC`)
      .limit(10)

    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("getPages error:", error)
    return NextResponse.json({ data: [], error: String(error) }, { status: 500 })
  }
}
import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { and, eq, gte, lt, sql } from "drizzle-orm"

function getDateFilter(filter: string) {
  switch (filter) {
    case "today":     return gte(events.createdAt, new Date(new Date().setHours(0,0,0,0)))
    case "yesterday": {
      const start = new Date(new Date().setHours(0,0,0,0))
      start.setDate(start.getDate() - 1)
      const end = new Date(new Date().setHours(0,0,0,0))
      return and(gte(events.createdAt, start), lt(events.createdAt, end))
    }
    case "7d":   return gte(events.createdAt, new Date(Date.now() - 7   * 86400000))
    case "30d":  return gte(events.createdAt, new Date(Date.now() - 30  * 86400000))
    case "180d": return gte(events.createdAt, new Date(Date.now() - 180 * 86400000))
    case "365d": return gte(events.createdAt, new Date(Date.now() - 365 * 86400000))
    default:     return undefined
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")
  const filter = searchParams.get("filter") ?? "today"

  if (!siteId) return NextResponse.json({ data: [] })

  const dateFilter = getDateFilter(filter)

  const where = dateFilter
    ? and(eq(events.siteId, siteId), dateFilter)
    : eq(events.siteId, siteId)

  const referrerCase = sql<string>`
    CASE
      WHEN ${events.referrer} IS NULL OR ${events.referrer} = '' THEN 'Direct'
      WHEN ${events.referrer} NOT LIKE 'http%' THEN ${events.referrer}
      ELSE SPLIT_PART(${events.referrer}, '/', 3)
    END
  `

  const result = await db
    .select({
      name: referrerCase,
      visitors: sql<number>`COUNT(*)`
    })
    .from(events)
    .where(where)
    .groupBy(referrerCase)
    .orderBy(sql`COUNT(*) DESC`)
    .limit(10)

  return NextResponse.json({ data: result })
}
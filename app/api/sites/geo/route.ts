import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { and, eq, gte, lt, ne, sql } from "drizzle-orm"

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

  if (!siteId) return NextResponse.json({ countries: [], regions: [], cities: [] })

  const dateFilter = getDateFilter(filter)

  const baseWhere = (extra: any) => dateFilter
    ? and(eq(events.siteId, siteId), dateFilter, extra)
    : and(eq(events.siteId, siteId), extra)

  const [countries, regions, cities] = await Promise.all([
    db.select({ name: events.country, visitors: sql<number>`COUNT(*)` })
      .from(events)
      .where(baseWhere(ne(events.country, "Unknown")))
      .groupBy(events.country),

    db.select({ name: events.region, visitors: sql<number>`COUNT(*)` })
      .from(events)
      .where(baseWhere(ne(events.region, "Unknown")))
      .groupBy(events.region)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10),

    db.select({ name: events.city, visitors: sql<number>`COUNT(*)` })
      .from(events)
      .where(baseWhere(ne(events.city, "Unknown")))
      .groupBy(events.city)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10),
  ])

  return NextResponse.json({ countries, regions, cities })
}
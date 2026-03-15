import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { and, eq, gte, lt, sql } from "drizzle-orm"

function getDateFilter(filter: string) {
  const now = new Date()
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

  if (!siteId) return NextResponse.json({ browsers: [], os: [], devices: [] })

  const dateFilter = getDateFilter(filter)

  const where = (col: any) => dateFilter
    ? and(eq(col, siteId), dateFilter)
    : eq(col, siteId)

  const [browsers, os, devices] = await Promise.all([
    db.select({ name: events.browser, count: sql<number>`COUNT(*)` })
      .from(events).where(where(events.siteId))
      .groupBy(events.browser).orderBy(sql`COUNT(*) DESC`),

    db.select({ name: events.os, count: sql<number>`COUNT(*)` })
      .from(events).where(where(events.siteId))
      .groupBy(events.os).orderBy(sql`COUNT(*) DESC`),

    db.select({ name: events.device, count: sql<number>`COUNT(*)` })
      .from(events).where(where(events.siteId))
      .groupBy(events.device).orderBy(sql`COUNT(*) DESC`),
  ])

  return NextResponse.json({ browsers, os, devices })
}
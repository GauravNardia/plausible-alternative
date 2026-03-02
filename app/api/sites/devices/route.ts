import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { eq, sql } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ browsers: [], os: [], devices: [] })
  }

  const browsers = await db
    .select({
      name: events.browser,
      count: sql<number>`COUNT(*)`
    })
    .from(events)
    .where(eq(events.siteId, siteId))
    .groupBy(events.browser)
    .orderBy(sql`COUNT(*) DESC`)

  const os = await db
    .select({
      name: events.os,
      count: sql<number>`COUNT(*)`
    })
    .from(events)
    .where(eq(events.siteId, siteId))
    .groupBy(events.os)
    .orderBy(sql`COUNT(*) DESC`)

  const devices = await db
    .select({
      name: events.device,
      count: sql<number>`COUNT(*)`
    })
    .from(events)
    .where(eq(events.siteId, siteId))
    .groupBy(events.device)
    .orderBy(sql`COUNT(*) DESC`)

  return NextResponse.json({ browsers, os, devices })
}
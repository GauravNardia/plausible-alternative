import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { dailyStats } from "@/database/schema"
import { eq, sql } from "drizzle-orm"



export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ data: null })
  }

  const result = await db
    .select({
      totalPageviews: sql<number>`SUM(${dailyStats.pageviews})`,
      totalVisitors: sql<number>`SUM(${dailyStats.uniqueVisitors})`
    })
    .from(dailyStats)
    .where(eq(dailyStats.siteId, siteId))

  return NextResponse.json({ data: result[0] })
}
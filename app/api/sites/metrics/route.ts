import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { eq, sql } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ data: null })
  }

  const result = await db
    .select({
      totalPageviews: sql<number>`COUNT(*)`,
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${events.visitorHash})`,
    })
    .from(events)
    .where(eq(events.siteId, siteId))

  const totalPageviews = Number(result[0]?.totalPageviews || 0)
  const uniqueVisitors = Number(result[0]?.uniqueVisitors || 0)

  const viewsPerVisit =
    uniqueVisitors > 0 ? totalPageviews / uniqueVisitors : 0

  return NextResponse.json({
    data: {
      uniqueVisitors,
      totalVisits: totalPageviews,
      totalPageviews,
      viewsPerVisit: viewsPerVisit.toFixed(2),
    },
  })
}
import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { eq, sql } from "drizzle-orm"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const siteId = searchParams.get("siteId")

    if (!siteId) {
      return NextResponse.json({ data: [] })
    }

const hourExpression = sql<string>`
  TO_CHAR(${events.createdAt} AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata', 'HH24:00')
`

    const result = await db
      .select({
        hour: hourExpression,
        count: sql<number>`COUNT(*)`
      })
      .from(events)
      .where(eq(events.siteId, siteId))
      .groupBy(hourExpression)
      .orderBy(hourExpression)

    return NextResponse.json({ data: result })

  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ data: [] })
  }
}
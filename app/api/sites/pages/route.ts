import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { eq, sql } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ data: [] })
  }

  const result = await db
    .select({
      path: events.path,
      visitors: sql<number>`COUNT(*)`
    })
    .from(events)
    .where(eq(events.siteId, siteId))
    .groupBy(events.path)
    .orderBy(sql`COUNT(*) DESC`)
    .limit(10)

  return NextResponse.json({ data: result })
}
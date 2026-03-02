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
    name: sql<string>`
      CASE
        WHEN ${events.referrer} IS NULL OR ${events.referrer} = '' THEN 'Direct'
        WHEN ${events.referrer} NOT LIKE 'http%' THEN ${events.referrer}
        ELSE SPLIT_PART(${events.referrer}, '/', 3)
      END
    `,
    visitors: sql<number>`COUNT(*)`
  })
  .from(events)
  .where(eq(events.siteId, siteId))
  .groupBy(
    sql`
      CASE
        WHEN ${events.referrer} IS NULL OR ${events.referrer} = '' THEN 'Direct'
        WHEN ${events.referrer} NOT LIKE 'http%' THEN ${events.referrer}
        ELSE SPLIT_PART(${events.referrer}, '/', 3)
      END
    ` 
  )
  .orderBy(sql`COUNT(*) DESC`)
  .limit(10)

  return NextResponse.json({ data: result })
}
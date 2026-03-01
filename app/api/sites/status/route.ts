import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
    console.log("GET SITE STATUS" )
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ hasEvents: false })
  }

  const existing = await db
    .select()
    .from(events)
    .where(eq(events.siteId, siteId))
    .limit(1)

  return NextResponse.json({
    hasEvents: existing.length > 0,
  })
}
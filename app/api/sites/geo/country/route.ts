import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { eq, and, ne, sql } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ totalCountries: 0 })
  }

  try {
    const result = await db
      .select({
        total: sql<number>`COUNT(DISTINCT ${events.country})`
      })
      .from(events)
      .where(
        and(
          eq(events.siteId, siteId),   
          ne(events.country, "Unknown"),
          ne(events.country, "")      
        )
      )

    return NextResponse.json({
      totalCountries: Number(result[0]?.total ?? 0)
    })

  } catch (error) {
    console.error("Country count error:", error)

    return NextResponse.json(
      { totalCountries: 0 },
      { status: 500 }
    )
  }
}
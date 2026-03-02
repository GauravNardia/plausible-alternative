import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events } from "@/database/schema"
import { eq, sql, and, ne } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({
      countries: [],
      regions: [],
      cities: []
    })
  }

  const [countries, regions, cities] = await Promise.all([

    // 🌍 Countries (NO LIMIT for map)
    db
      .select({
        name: events.country,
        visitors: sql<number>`COUNT(*)`
      })
      .from(events)
      .where(
        and(
          eq(events.siteId, siteId),
          ne(events.country, "Unknown")
        )
      )
      .groupBy(events.country),

    // 📍 Regions
    db
      .select({
        name: events.region,
        visitors: sql<number>`COUNT(*)`
      })
      .from(events)
      .where(
        and(
          eq(events.siteId, siteId),
          ne(events.region, "Unknown")
        )
      )
      .groupBy(events.region)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10),

    // 🏙 Cities
    db
      .select({
        name: events.city,
        visitors: sql<number>`COUNT(*)`
      })
      .from(events)
      .where(
        and(
          eq(events.siteId, siteId),
          ne(events.city, "Unknown")
        )
      )
      .groupBy(events.city)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(10),
  ])

  return NextResponse.json({
    countries,
    regions,
    cities
  })
}
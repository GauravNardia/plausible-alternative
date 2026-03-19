import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { events, sites } from "@/database/schema"
import { eq } from "drizzle-orm"
import { redis } from "@/lib/config/redis"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return NextResponse.json({ hasEvents: false })
  }

    // Get apiKey for this site
  const site = await db
    .select({ publicApiKey: sites.publicApiKey })
    .from(sites)
    .where(eq(sites.id, siteId))
    .limit(1)
    .then(res => res[0])

  if (!site) return NextResponse.json({ hasEvents: false })

  // Check Redis first — instant
  const flag = await redis.get(`first_event:${site.publicApiKey}`)
  if (flag) return NextResponse.json({ hasEvents: true })

  const existing = await db
    .select()
    .from(events)
    .where(eq(events.siteId, siteId))
    .limit(1)

  return NextResponse.json({
    hasEvents: existing.length > 0,
  })
}
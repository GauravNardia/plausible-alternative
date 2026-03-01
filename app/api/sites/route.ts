
import { db } from "@/database/drizzle"
import { sites } from "@/database/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const newSite = await db.insert(sites).values({
    userId: body.userId,
    domain: body.domain,
    publicApiKey: body.apiKey,
  }).returning()

  return NextResponse.json(newSite[0])
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  const userSites = await db
    .select()
    .from(sites)
    .where(eq(sites.userId, userId!))

  return NextResponse.json(userSites)
}
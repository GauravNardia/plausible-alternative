import { NextResponse } from "next/server"
import { isBot } from "@/lib/boat"
import { eventSchema } from "@/lib/validations"
import { getGeo } from "@/lib/geo"
import { redis } from "@/lib/config/redis"
import { rateLimit } from "@/lib/rate-limit"

export async function POST(req: Request) {
  try {
    const body = eventSchema.parse(await req.json())

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "0.0.0.0"

    if (isBot(body.ua)) {
      return new NextResponse(null, { status: 204 })
    }

    // Rate limit check
    if(await rateLimit(ip)) {
      return new NextResponse(null, { status: 429 })
    }

    const { country, region, city } = getGeo(req)


    // Push to redis queue
    const QUEUE = process.env.REDIS_QUEUE_NAME!
    await redis.lpush(QUEUE, JSON.stringify({
      ...body,
      ip,
      country,
      region,
      city,
      timestamp: Date.now(),
    }))

    return new NextResponse(null, { status: 204 })

  } catch (error) {
    console.error("Track error:", error)

    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}
import { redis } from "./config/redis"

export async function rateLimit(ip: string) {
  const key = `rate:${ip}`
  const maxRequests = 300
  const windowSeconds = 60

  // increment count for this IP
  const counter = await redis.incr(key);

  // set expiry
  if( counter == 1 ) {
    await redis.expire(key, windowSeconds)
  }

  // over limit
  if (counter > maxRequests) return true

  return false
}
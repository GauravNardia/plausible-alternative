const requests = new Map<string, number[]>()

export function rateLimit(ip: string) {
  const now = Date.now()
  const windowMs = 60000

  const timestamps = requests.get(ip) || []

  const filtered = timestamps.filter((t) => now - t < windowMs)
console.log("rate limit",filtered.length)
  if (filtered.length > 1000) {
    return false
  }

  filtered.push(now)
  requests.set(ip, filtered)

  return true
}
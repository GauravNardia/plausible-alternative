export function isBot(ua: string) {
  const bots = ["bot", "spider", "crawler", "curl", "wget"]
  const lower = ua.toLowerCase()

  return bots.some((b) => lower.includes(b))
}
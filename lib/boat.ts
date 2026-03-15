// lib/bot.ts

// Layer 1 — Known bot User-Agent patterns
const BOT_PATTERNS = [
  // Generic
  "bot", "spider", "crawler", "crawling",
  "scraper", "scraping", "headless",

  // CLI tools
  "curl", "wget", "python-requests", "axios",
  "go-http-client", "java/", "ruby",
  "postman", "insomnia",

  // Search engines
  "googlebot", "bingbot", "slurp", "duckduckbot",
  "baiduspider", "yandexbot", "sogou", "exabot",
  "facebot", "ia_archiver",

  // SEO tools
  "semrushbot", "ahrefsbot", "mj12bot", "dotbot",
  "rogerbot", "screaming frog", "seokicks",

  // Monitoring & testing
  "pingdom", "gtmetrix", "pagespeed", "lighthouse",
  "chrome-lighthouse", "checkly", "statuscake",
  "uptimerobot", "newrelic", "datadog",

  // Headless browsers
  "phantomjs", "selenium", "webdriver",
  "playwright", "puppeteer",

  // Feed readers
  "feedfetcher", "feedly", "feedburner",

  // Security scanners
  "nikto", "nessus", "masscan", "zgrab",
]

// Layer 2 — Suspicious UA patterns (regex)
const SUSPICIOUS_PATTERNS = [
  /^mozilla\/\d\.\d\s*$/i,          // Too short — just "Mozilla/5.0"
  /^java\//i,                        // Java HTTP client
  /^python/i,                        // Python scripts
  /^go\//i,                          // Go HTTP client
  /libwww/i,                         // Old perl library
  /^-$/,                             // Just a dash
  /^\s*$/,                           // Empty or whitespace
]

// Layer 3 — Valid browser check
// Real browsers always have these in UA
const REAL_BROWSER_SIGNALS = [
  "mozilla",
  "applewebkit",
  "gecko",
]

export function isBot(ua: string): boolean {
  if (!ua || ua.trim() === "") {
    console.log("BLOCKED: empty UA")
    return true
  }

  const lower = ua.toLowerCase()

  // Check known bot patterns
  if (BOT_PATTERNS.some(pattern => lower.includes(pattern))) return true

  // Check suspicious patterns
  if (SUSPICIOUS_PATTERNS.some(pattern => pattern.test(ua))) return true

  // If UA is too short (less than 20 chars)
  if (ua.length < 20) return true

  // If UA doesn't contain any real browser signal — likely a bot
  const hasRealBrowserSignal = REAL_BROWSER_SIGNALS.some(signal =>
    lower.includes(signal)
  )
  if (!hasRealBrowserSignal) return true

  return false
}
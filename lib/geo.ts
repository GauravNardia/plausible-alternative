export function getGeo(req: Request) {
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    "Unknown"

  const region =
    req.headers.get("x-vercel-ip-country-region") ??
    "Unknown"

  const rawCity = req.headers.get("x-vercel-ip-city") ?? "Unknown"
  const city = rawCity === "Unknown" ? "Unknown" : decodeURIComponent(rawCity)

  return { country, region, city }
}
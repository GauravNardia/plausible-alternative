export function getCountry(req: Request) {
  return (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    "Unknown"
  )
}
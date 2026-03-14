export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sites/metrics?siteId=test`, { cache: "no-store" })
    const text = await res.text()
    return Response.json({ status: res.status, body: text.slice(0, 300) })
  } catch (e: any) {
    return Response.json({ error: e.message })
  }
}
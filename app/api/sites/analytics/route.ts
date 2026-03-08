import { NextResponse } from "next/server"
import { db } from "@/database/drizzle"
import { sql } from "drizzle-orm"

function sanitizeTz(tz: string | null): string {
  if (!tz) return "UTC"
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
    return tz
  } catch {
    return "UTC"
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const siteId = searchParams.get("siteId")
    const filter = searchParams.get("filter") ?? "today"
    const tz     = sanitizeTz(searchParams.get("tz"))

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 })
    }

    const isHourly = filter === "today" || filter === "yesterday"

    // Key fix: created_at is TIMESTAMP WITHOUT TIME ZONE stored as UTC
    // So we must do: created_at AT TIME ZONE 'UTC' AT TIME ZONE '${tz}'
    // First AT TIME ZONE tells Postgres "this value is in UTC"
    // Second AT TIME ZONE converts it to the user's local timezone

    if (isHourly) {
      let whereClause: string
      if (filter === "today") {
        whereClause = `
          (created_at AT TIME ZONE 'UTC' AT TIME ZONE '${tz}')::date
          = (NOW() AT TIME ZONE '${tz}')::date
        `
      } else {
        whereClause = `
          (created_at AT TIME ZONE 'UTC' AT TIME ZONE '${tz}')::date
          = (NOW() AT TIME ZONE '${tz}')::date - INTERVAL '1 day'
        `
      }

      const result = await db.execute(sql`
        SELECT
          TO_CHAR(created_at AT TIME ZONE 'UTC' AT TIME ZONE ${sql.raw(`'${tz}'`)}, 'HH24:00') AS label,
          COUNT(*) AS count
        FROM events
        WHERE
          site_id = ${siteId}
          AND ${sql.raw(whereClause)}
        GROUP BY label
        ORDER BY label
      `)

      return NextResponse.json({ data: result.rows, hourly: true })

    } else {
      let whereClause: string
      switch (filter) {
        case "7d":   whereClause = `created_at >= NOW() - INTERVAL '7 days'`;   break
        case "30d":  whereClause = `created_at >= NOW() - INTERVAL '30 days'`;  break
        case "180d": whereClause = `created_at >= NOW() - INTERVAL '180 days'`; break
        case "365d": whereClause = `created_at >= NOW() - INTERVAL '365 days'`; break
case "all":
default:
  whereClause = `1=1`
  break
      }

      const result = await db.execute(sql`
        SELECT
          TO_CHAR(created_at AT TIME ZONE 'UTC' AT TIME ZONE ${sql.raw(`'${tz}'`)}, 'YYYY-MM-DD') AS label,
          COUNT(*) AS count
        FROM events
        WHERE
          site_id = ${siteId}
          AND ${sql.raw(whereClause)}
        GROUP BY label
        ORDER BY label
      `)

      return NextResponse.json({ data: result.rows, hourly: false })
    }

  } catch (err) {
    console.error("Analytics API error:", err)
    return NextResponse.json({ data: [], hourly: true }, { status: 500 })
  }
}
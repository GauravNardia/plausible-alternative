import { db } from "@/database/drizzle"
import { sql } from "drizzle-orm"

export async function GET() {
  await db.execute(sql`
    DELETE FROM events
    WHERE created_at < NOW() - INTERVAL '90 days'
  `)

  return new Response("Cleanup done")
}
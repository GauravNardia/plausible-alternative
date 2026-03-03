"use server"

import { db } from "@/database/drizzle"
import { sites } from "@/database/schema"
import { eq } from "drizzle-orm"

export const canCreateSite = async (userId: string, maxSites: number) => {
  const result = await db
    .select()
    .from(sites)
    .where(eq(sites.userId, userId))

  return result.length < maxSites
}
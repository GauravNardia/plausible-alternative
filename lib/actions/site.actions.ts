"use server"

import { db } from "@/database/drizzle"
import { sites } from "@/database/schema"
import { eq } from "drizzle-orm"

export const getApiKey = async (userId: string) => {
  try {
    if (!userId) {
      return { success: false, error: "User ID is required" }
    }

    const result = await db
      .select({ publicApiKey: sites.publicApiKey })
      .from(sites)
      .where(eq(sites.userId, userId))
      .limit(1)

    if (!result.length) {
      return { success: false, error: "No site found" }
    }

    return {
      success: true,
      data: result[0].publicApiKey,
    }

  } catch (error) {
    console.error("GET API KEY ERROR:", error)

    return {
      success: false,
      error: "Something went wrong",
    }
  }
}
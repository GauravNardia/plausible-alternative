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

export const getGeo = async (siteId: string) => {
  const res = await fetch(
    `${process.env.APP_URL!}/api/sites/geo?siteId=${siteId}`,
    { cache: "no-store" }
  )

  return res.json()
}

export const getMetrics = async (siteId: string) => {
  const res = await fetch(
    `${process.env.APP_URL!}/api/sites/metrics?siteId=${siteId}`,
    { cache: "no-store" }
  )
  const json = await res.json()
  return json.data
}

export const getSources = async (siteId: string) => {
  const res = await fetch(
    `${process.env.APP_URL!}/api/sites/sources?siteId=${siteId}`,
    { cache: "no-store" }
  )
  const json = await res.json()
  return json.data || []
}

export const getPages = async (siteId: string) => {
  const res = await fetch(
    `${process.env.APP_URL!}/api/sites/pages?siteId=${siteId}`,
    { cache: "no-store" }
  )
  const json = await res.json()
  return json.data || []
}

export const getData = async (siteId: string) => {
  const res = await fetch(
    `${process.env.APP_URL!}/api/sites/devices?siteId=${siteId}`,
    { cache: "no-store" }
  )

  return res.json()
}


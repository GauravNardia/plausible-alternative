"use server"

import { db } from "@/database/drizzle"
import { monthlyUsage } from "@/database/schema"
import { and, eq, sql } from "drizzle-orm"

export const checkMonthlyLimit = async (userId: string, limit: number) => {
  const month = new Date().toISOString().slice(0, 7)

  const result = await db
    .select()
    .from(monthlyUsage)
    .where(
      and(
        eq(monthlyUsage.userId, userId),
        eq(monthlyUsage.month, month)
      )
    )

  const usage = result[0]

  if (!usage || !usage.eventsCount) return true

  return usage.eventsCount < limit
}

export const incrementUsage = async (userId: string) => {
  const month = new Date().toISOString().slice(0, 7)

  await db
    .insert(monthlyUsage)
    .values({
      userId,
      month,
      eventsCount: 1
    })
    .onConflictDoUpdate({
      target: [monthlyUsage.userId, monthlyUsage.month],
      set: {
        eventsCount: sql`${monthlyUsage.eventsCount} + 1`
      }
    })
}
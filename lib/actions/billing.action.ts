"use server"

import { db } from "@/database/drizzle"
import { subscriptions, pricingTiers } from "@/database/schema"
import { eq } from "drizzle-orm"

export const getActiveSubscription = async (userId: string) => {
  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))

  return result[0] ?? null
}

export const getPricingTier = async (tierId: string) => {
  const result = await db
    .select()
    .from(pricingTiers)
    .where(eq(pricingTiers.id, tierId))

  return result[0] ?? null
}
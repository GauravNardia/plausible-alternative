"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

export const getUserById = async (userId: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return user.length ? user[0] : null
  } catch (err) {
    console.error('[getUserById]', err)
    return null
  }
}
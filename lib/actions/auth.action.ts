"use server"

import { db } from "@/database/drizzle"
import { pricingTiers, sites, subscriptions, users } from "@/database/schema"
import bcrypt from "bcryptjs"
import { and, eq } from "drizzle-orm"
import { auth, signIn, signOut } from "@/auth"
import  AuthError  from "next-auth"
import { generatePublicApiKey } from "../api-key"


export const registerUser = async(email: string, password: string, name: string) => {
  try {
    if (!email || !password || !name) {
      return { success: false, error: "Email and password required" }
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existingUser.length > 0) {
      return { success: false, error: "User already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    })

    return { success: true }
  } catch (error) {
    console.error("Register Error:", error)
    return { success: false, error: "Something went wrong" }
  }
}

export const loginUser = async(email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { success: false, error: "Invalid credentials" }
    }

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: "Invalid email or password"
      }
    }

    return {
      success: false,
      error: "Something went wrong"
    }
  }
}

export const logoutUser = async() => {
  await signOut({ redirectTo: "/sign-in" })
}

export const onboardinguser = async (
  domain: string,
  site: string
) => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    const userId = session.user.id

    /* ================= CHECK SUBSCRIPTION ================= */

    const subscription = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, userId),
          eq(subscriptions.status, "active")
        )
      )
      .then(res => res[0])

    if (!subscription) {
      return { success: false, error: "No active subscription", status: 403 }
    }

    /* ================= GET PRICING TIER ================= */

    const tier = await db
      .select()
      .from(pricingTiers)
      .where(eq(pricingTiers.id, subscription.pricingTierId))
      .then(res => res[0])

    if (!tier) {
      return { success: false, error: "Pricing tier not found", status: 404 }
    }

    /* ================= CHECK SITE LIMIT ================= */

    const existingSites = await db
      .select()
      .from(sites)
      .where(eq(sites.userId, userId))

    if (existingSites.length >= tier.maxSites) {
      return {
        success: false,
        error: "Site limit reached",
        status: 402,
      }
    }

    /* ================= CREATE SITE ================= */

    const apiKey = generatePublicApiKey()

    const inserted = await db
      .insert(sites)
      .values({
        domain,
        name: site,
        userId,
        publicApiKey: apiKey,
      })
      .returning({ id: sites.id })

    await db
      .update(users)
      .set({ onboarded: true })
      .where(eq(users.id, userId))

    return {
      siteId: inserted[0].id,
      success: true,
    }

  } catch (error) {
    console.error("ONBOARDING ERROR:", error)

    return {
      success: false,
      error: "Something went wrong",
    }
  }
}

export const isUserOnboarded = async(userId: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (!user.length) {
      return { success: false, error: "User not found" }
    }

    return { success: true, onboarded: user[0].onboarded }
  } catch (error) {
    console.error("ONBOARDING CHECK ERROR:", error)
    return {
      success: false,
      error: "Something went wrong",
    }
  }
}
"use server"

import { db } from "@/database/drizzle"
import { pricingTiers, sites, subscriptions, users } from "@/database/schema"
import bcrypt from "bcryptjs"
import { and, eq } from "drizzle-orm"
import { auth, signIn, signOut } from "@/auth"
import  AuthError  from "next-auth"
import { generatePublicApiKey } from "../api-key"
import { normalizeDomain } from "../utils"
import { v4 as uuidv4 } from "uuid"
import { resend } from "../config/resend"


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
    const normalizedomain = normalizeDomain(domain)

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
        domain: normalizedomain,
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

export const forgetPassword = async(email: string) => {
try {
    const user = await db.select().from(users)
      .where(eq(users.email, email)).limit(1);
  
    if (user.length === 0) return { success: true };
  
    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  
    await db.update(users)
      .set({
         passwordResetToken: token,
         passwordResetExpires: expires
      })
      .where(eq(users.email, email));
  
    await resend.emails.send({
      from: "Puffin Analytics <noreply@puffinanalytics.com>",
      to: email,
      subject: "Reset your password",
      html: `
        <p>Click the link below to reset your password. Expires in 1 hour.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL!}/reset-password?token=${token}">
          Reset Password
        </a>
      `,
    });
  
    return { success: true };
} catch (error) {
  console.error("FORGET PASSWORD ERROR:", error)
    return {
      success: false,
      error: "Something went wrong",
    }
  
}
}

export const resetPassword = async(token: string, password: string) => {
  try {

    const user = await db.select().from(users)
    .where(eq(users.passwordResetToken, token)).limit(1);

  if (user.length === 0) {
    return { error: "Invalid or expired token" };
  }

  // Token expired
  if (!user[0].passwordResetExpires || user[0].passwordResetExpires < new Date()) {
    return { error: "Token has expired. Please request a new one." };
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.update(users)
    .set({
      password: hashed,
      passwordResetToken: null,
      passwordResetExpires: null,
    })
    .where(eq(users.passwordResetToken, token));

  return { success: true };
    
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error)
    return {
      success: false,
      error: "Something went wrong",
    }
    
  }
}
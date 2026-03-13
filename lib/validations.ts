import { z } from "zod"

export const eventSchema = z.object({
  apiKey: z.string(),
  path: z.string(),
  referrer: z.string().optional(),
  ua: z.string(),
})

export const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8,"Password must be at least 8 characters"),
})

export const onboardingSchema = z.object({
  domain: z.string().transform((val) => val.replace(/^https?:\/\//, "").replace(/\/$/, "")).refine((val) => /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(val),"Enter a valid domain like example.com"),
  site: z.string().min(2, "Site name is required"),
})

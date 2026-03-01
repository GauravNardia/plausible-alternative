import { z } from "zod"

export const eventSchema = z.object({
  apiKey: z.string(),
  path: z.string(),
  referrer: z.string().optional(),
  ua: z.string(),
})
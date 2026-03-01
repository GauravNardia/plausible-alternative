import crypto from "crypto"

export function generatePublicApiKey() {
  const random = crypto.randomBytes(32).toString("hex")
  return `pk_live_${random}`
}
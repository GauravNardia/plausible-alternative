import crypto from "crypto"

export function generateVisitorHash(ip: string, ua: string) {
  const today = new Date().toISOString().slice(0, 10)

  return crypto
    .createHash("sha256")
    .update(ip + ua + today + process.env.HASH_SECRET)
    .digest("hex")
}
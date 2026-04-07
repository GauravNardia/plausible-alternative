import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeDomain(input: string) {
  return input
    .replace(/^https?:\/\//, "") // remove http/https
    .replace(/^www\./, "")       // remove www
    .replace(/\/$/, "")          // remove trailing slash
    .toLowerCase()
}

export function shortenEmail(email: string) {
  const name = email.split("@")[0]
  const short = name.slice(0, 6)
  return `${short}@...`

}

export function formatNumber(num: number) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M"
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + "K"
  }

  return num.toString()
}

export function getDeviceFromScreen(width?: number) {
  if (!width) return "desktop";
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function normalizePath(path: string) {
  return path
    .replace(/\/[0-9a-fA-F-]{36}/g, "/:id")
    .replace(/\/\d+/g, "/:id");
}
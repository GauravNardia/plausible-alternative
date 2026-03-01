export function parseUA(ua: string) {
  return {
    browser: ua.includes("Chrome") ? "Chrome" : "Other",
    os: ua.includes("Mac") ? "MacOS" : "Other",
    device: ua.includes("Mobile") ? "Mobile" : "Desktop",
  }
}
import { UAParser } from "ua-parser-js";

function normalize(str: string | undefined, fallback: string) {
  if (!str) return fallback;

  const value = str.toLowerCase().trim();

  // remove garbage values
  if (
    value === "unknown" ||
    value === "undefined" ||
    value === "null" ||
    value === ""
  ) {
    return fallback;
  }

  return value;
}

export function parseUA(ua: string) {
  const parser = new UAParser(ua);
  const result = parser.getResult();

  // ------------------------
  // BROWSER
  // ------------------------
  const browserRaw = normalize(result.browser.name, "other");

  let browser = browserRaw;
  if (browserRaw.includes("chrome")) browser = "chrome";
  else if (browserRaw.includes("safari")) browser = "safari";
  else if (browserRaw.includes("firefox")) browser = "firefox";
  else if (browserRaw.includes("edge")) browser = "edge";

  // ------------------------
  // OS
  // ------------------------
  const osRaw = normalize(result.os.name, "other");

  let os = osRaw;
  if (osRaw.includes("mac")) os = "macos";
  else if (osRaw === "ios") os = "ios";
  else if (osRaw.includes("windows")) os = "windows";
  else if (osRaw === "android") os = "android";

  // ------------------------
  // DEVICE
  // ------------------------
  let device = result.device.type || "desktop";

  if (device !== "mobile" && device !== "tablet") {
    device = "desktop";
  }

  return {
    browser,
    os,
    device,
  };
}
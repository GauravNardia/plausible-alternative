import { UAParser } from "ua-parser-js";

function normalize(str: string | undefined, fallback: string) {
  if (!str) return fallback;

  return str.toLowerCase(); // keep lowercase in DB
}

export function parseUA(ua: string) {
  const parser = new UAParser(ua);
  const result = parser.getResult();

  const browser = normalize(result.browser.name, "other");
  const os = normalize(result.os.name, "other");

  let device = result.device.type || "desktop";

  // keep lowercase to satisfy TS
  if (device !== "mobile" && device !== "tablet") {
    device = "desktop";
  }

  return {
    browser,
    os,
    device,
  };
}
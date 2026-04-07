import UAParser from "ua-parser-js";

export function parseUA(ua: string) {
  const parser = new UAParser(ua);
  const result = parser.getResult();

  return {
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
    device: result.device.type || "desktop",
  };
}
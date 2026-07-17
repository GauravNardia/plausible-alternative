export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  
  const script = `
(function(){
  console.log("script loaded");

  // Client side bot detection
  
  // Check 1 — headless browser (most common bot)
  if (navigator.webdriver) return;

  // Check 2 — no real screen
  if (!window.screen || window.screen.width === 0) return;

  // Check 3 — no language set (bots often skip this)
  if (!navigator.language) return;

  // Check 4 — window must have real dimensions
  if (window.innerWidth === 0 || window.innerHeight === 0) return;

  // Check 5 — must support basic APIs
  if (typeof window.localStorage === "undefined") return;

  const script = document.currentScript;
  const apiKey = script.getAttribute("data-api-key");

  let lastPath = location.pathname;

  function track(){
  const params = new URLSearchParams(location.search);

  let finalReferrer = document.referrer;

  const refParam = params.get("ref");
  if (refParam) {
    finalReferrer = refParam;
  }


    const payload = {
      apiKey,
      path: location.pathname,
      referrer: finalReferrer,
      ua: navigator.userAgent,
      lang: navigator.language,
      screen: {
        w: window.innerWidth,
        h: window.innerHeight
      },
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
    };

    navigator.sendBeacon(
      "${origin}/api/event",
      JSON.stringify(payload)
    );
  }

  function checkPathChange() {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      t;
    }
  }rack()

  track();

  setInterval(checkPathChange, 500);
  window.addEventListener("popstate", checkPathChange);

})();
  `;

  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "no-store",
    },
  });
}
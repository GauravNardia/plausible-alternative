export async function GET(req: Request) {
  const origin = new URL(req.url).origin;

  const script = `
(function(){
  console.log("🐧 Puffin script loaded");

  const script = document.currentScript;
  const apiKey = script.getAttribute("data-api-key");

  let lastPath = location.pathname;

  function track(){
    console.log("📊 Tracking:", location.pathname);

    const payload = {
      apiKey,
      path: location.pathname,
      referrer: document.referrer,
      ua: navigator.userAgent
    };

    navigator.sendBeacon(
      "${origin}/api/event",
      JSON.stringify(payload)
    );
  }

  function checkPathChange() {
    if (location.pathname !== lastPath) {
      console.log("🔁 Route changed:", location.pathname);
      lastPath = location.pathname;
      track();
    }
  }

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
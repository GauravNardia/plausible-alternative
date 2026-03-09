export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  

  const script = `
(function(){
  console.log("script loaded");

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
      ua: navigator.userAgent
    };

    navigator.sendBeacon(
      "${origin}/api/event",
      JSON.stringify(payload)
    );
  }

  function checkPathChange() {
    if (location.pathname !== lastPath) {
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
export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  

  const script = `
  (function(){
    const script = document.currentScript;
    const apiKey = script.getAttribute("data-api-key");

    function track(){
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

    track();
  })();
  `;

  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
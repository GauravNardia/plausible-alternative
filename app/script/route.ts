export async function GET(req: Request) {
  const origin = new URL(req.url).origin;

  const script = `
  (function(){
    const script = document.currentScript;
    const domain = script.getAttribute("data-domain");

    function track(){
      const payload = {
        domain,
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
      "Cache-Control": "no-store",
    },
  });
}
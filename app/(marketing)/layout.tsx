import { Navbar } from "@/components/marketing/Navbar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Puffin Analytics — Know exactly who's visiting your site",
  description: "Traffic insights — no cookies, no GDPR headaches, no bloat. Built for indie hackers & serious teams alike.",
  metadataBase: new URL("https://dev.puffinanalytics.com"),
  openGraph: {
    title: "Puffin Analytics — Know exactly who's visiting your site",
    description: "Traffic insights — no cookies, no GDPR headaches, no bloat.",
    url: "https://dev.puffinanalytics.com",
    siteName: "Puffin Analytics",
    images: [{ url: "https://dev.puffinanalytics.com/assets/og/homepage-og.png", width: 1200, height: 630, alt: "Puffin Analytics" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puffin Analytics — Know exactly who's visiting your site",
    description: "Real-time traffic insights — no cookies, no GDPR headaches, no bloat.",
    images: ["https://dev.puffinanalytics.com/assets/og/homepage-og.png"],
  },
}

const MarketingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full max-w-6xl border mx-auto flex flex-col justify-center">
      <div
        className={` antialiased`}
      >
        <Navbar />
        {children}
      </div>
    </section>
  );
}

export default MarketingLayout;
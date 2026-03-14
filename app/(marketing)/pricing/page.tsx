import PricingSlider from "@/components/pricing/PricingSlider"
import { auth } from "@/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing — Puffin Analytics",
  description: "Simple plans that scale with your traffic. Start at $7/mo. Cancel anytime.",
  metadataBase: new URL("https://dev.puffinanalytics.com"),
  openGraph: {
    title: "Pay for what you use. Nothing more.",
    description: "Simple plans that scale with your traffic. Start at $7/mo. Cancel anytime.",
    url: "https://dev.puffinanalytics.com/pricing",
    siteName: "Puffin Analytics",
    images: [{ url: "/assets/og/pricingpage-og.png", width: 1200, height: 630, alt: "Puffin Analytics Pricing" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pay for what you use. Nothing more.",
    description: "Simple plans that scale with your traffic. Start at $7/mo. Cancel anytime.",
    images: ["https://dev.puffinanalytics.com/assets/og/pricingpage-og.png"],
  },
}

export default async function PricingPage() {
  const session = await auth()
  const userEmail = session?.user?.email ?? ""

  return (
    <section className="min-h-screen bg-[#ffffff] text-black py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-4xl font-semibold font-bpmf">
            Transparent traffic-based pricing
          </h1>
          <p className="text-neutral-600 mt-4 px-3 sm:px-0">
            You only pay for the traffic you track.
            No feature restrictions.
          </p>
        </div>
        <div className="dot-bg h-[60px] sm:h-[80px] border-t" />
        <PricingSlider userEmail={userEmail} isLoggedIn={!!session?.user} />
      </div>
    </section>
  )
}
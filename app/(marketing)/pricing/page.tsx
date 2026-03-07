import PricingSlider from "@/components/pricing/PricingSlider"
import { auth } from "@/auth"

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
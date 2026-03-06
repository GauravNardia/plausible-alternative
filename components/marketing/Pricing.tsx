import { auth } from "@/auth"
import PricingSliderMarketing from "./PricingSliderMarketing"


export default async function MarketingPricing() {
  const session = await auth()
  const userEmail = session?.user?.email ?? ""

  return (
    <section className="min-h-screen bg-[#ffffff] text-black pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-left  mb-16 px-3 sm:px-5">
          <h1 className="text-4xl md:text-4xl font-semibold font-bpmf">
            Transparent traffic-based pricing
          </h1>
          <p className="text-neutral-600 mt-4 px-3 sm:px-0">
            You only pay for the traffic you track.
            No feature restrictions.
          </p>
        </div>
        <PricingSliderMarketing userEmail={userEmail} />
      </div>
    </section>
  )
}
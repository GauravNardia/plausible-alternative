import PricingSlider from "@/components/pricing/PricingSlider"

export default function PricingPage() {
  return (
    <section className="min-h-screen bg-[#ffffff] text-black py-20">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-3xl font-semibold font-bpmf">
            Transparent traffic-based pricing
          </h1>
          <p className="text-neutral-600 mt-4">
            You only pay for the traffic you track.
            No feature restrictions.
          </p>
        </div>
            <div className="dot-bg h-[60px] sm:h-[80px] border-t" />


        <PricingSlider />

      </div>
    </section>
  )
}
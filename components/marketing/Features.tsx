import Image from "next/image"

export const FeaturesSection = () => {
  return (
    <section className="w-full border-gray-200 bg-white">

      {/* Top Header */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-2 items-start">
        <div>
          <p className="text-xs tracking-[0.25em] blue-text font-semibold uppercase">
            For Builders
          </p>

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-4xl font-bpmf font-semibold leading-tight">
            Analytics Without
            <br />
            the Complexity.
          </h2>
        </div>

        <div className="text-gray-600 text-lg leading-relaxed sm:mt-10">
          Clean data. Clear insights. No invasive tracking.
          Built for founders and developers who treat analytics
          as a performance tool — not surveillance software.
        </div>
      </div>

      {/* Feature Tabs Row */}
      <div className="border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-md font-bpmf">
          <div className="flex gap-3 items-center p-6 border-r border-gray-200 hover:bg-gray-50 transition">
            <Image src="/assets/icons/rocket.svg" alt="Lightning Script" width={24} height={24} />
            Lightning Script
          </div>

          <div className="flex gap-3 items-center p-6 border-r border-gray-200 hover:bg-gray-50 transition">
            <Image src="/assets/icons/locked.svg" alt="Privacy First" width={24} height={24} />
            Privacy First
          </div>

          <div className="flex gap-3 items-center p-6 border-r border-gray-200 hover:bg-gray-50 transition">
            <Image src="/assets/icons/analytics.svg" alt="Dashboard" width={24} height={24} />
            Dashboard
          </div>

          <div className="flex gap-3 items-center p-6 hover:bg-gray-50 transition">
            <Image src="/assets/icons/earth.svg" alt="Geo Insights" width={24} height={24} />
            Geo Insights
          </div>

        </div>
      </div>

      {/* Feature Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bpmf font-semibold leading-tight">
          Simple Analytics. Powerful Insights.
        </h3>

        <p className="mt-6 text-neutral-500 text-md leading-relaxed max-w-3xl">
          Puffin gives you the metrics that matter without tracking personal data
          or slowing down your website.
        </p>

        {/* Showcase Box */}
        <div className="mt-16 bg-gray-100 rounded-2xl h-[420px] flex items-center justify-center text-gray-400 text-sm">
          Dashboard Preview Here
        </div>
      </div>
    </section>
  )
}
export const SetupSection = () => {
  return (
    <section className="w-full border-b border-gray-200 bg-white">

      {/* Top Heading Area */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-xs tracking-[0.25em] blue-text font-semibold uppercase">
          Privacy First
        </p>

        <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bpmf font-semibold leading-tight">
          Analytics Shouldn't Feel
          <br className="hidden sm:block" />
          Like Surveillance.
        </h2>

        <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
          Most analytics platforms collect everything they can.
          <br className="hidden sm:block" />
          Puffin collects only what actually matters.
        </p>
      </div>

      {/* Bottom Feature Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">

        {/* Card 1 */}
        <div className="p-10 border-b md:border-b-0 md:border-r border-gray-200">
          <h3 className="text-md tracking-wider uppercase font-semibold font-bpmf">
            No Personal Data
          </h3>

          <p className="mt-4 text-neutral-600 text-sm leading-relaxed">
            We don't collect names, emails, IP addresses,
            or build hidden user profiles.
            Your visitors stay anonymous.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-10 border-b md:border-b-0 md:border-r border-gray-200">
          <h3 className="text-md tracking-wider uppercase font-semibold font-bpmf">
            No Cookies. Ever.
          </h3>

          <p className="mt-4 text-neutral-600 text-sm leading-relaxed">
            No consent banners. No fingerprinting.
            Puffin works without invasive tracking technologies.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-10">
          <h3 className="text-md tracking-wider uppercase font-semibold font-bpmf">
            Built for Trust
          </h3>

          <p className="mt-4 text-neutral-600 text-sm leading-relaxed">
            Understand traffic, pages, and sources —
            without compromising your users' privacy.
          </p>
        </div>

      </div>

    </section>
  )
}
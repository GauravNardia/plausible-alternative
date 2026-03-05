export default function PrivacyPage() {
  return (
    <main className="w-full min-h-screen bg-[#ffffff] flex justify-center items-center py-24">
      <div className="w-full">

        {/* Hero */}
        <div className="text-center mb-16 border-b border-gray-200 pb-20">
          <p className="text-sm blue-text mb-3 tracking-wide font-semibold uppercase">
            Legal
          </p>

          <h1 className="text-4xl font-semibold font-bpmf text-black mb-4">
            Privacy Policy
          </h1>

          <p className="text-neutral-600 text-md max-w-xl mx-auto">
            Learn how Puffin Analytics collects, uses, and protects data while
            keeping privacy at the core.
          </p>

          <p className="text-sm text-neutral-500 mt-4">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto space-y-12 text-neutral-700 leading-relaxed text-[16px] px-6">

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              1. What data we collect
            </h2>
            <p className="text-neutral-600 mb-4">
              Puffin Analytics collects anonymous usage data about website
              traffic. This may include:
            </p>

            <ul className="list-disc ml-6 text-neutral-600 space-y-2">
              <li>Page views</li>
              <li>Referrer source</li>
              <li>Country (derived from IP)</li>
              <li>Device and browser type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              2. No personal data
            </h2>
            <p className="text-neutral-600">
              Puffin Analytics does not collect personal information, does not
              store full IP addresses, and does not track individual users
              across websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              3. No cookies
            </h2>
            <p className="text-neutral-600">
              Puffin Analytics does not use cookies or persistent identifiers.
              This means websites using Puffin Analytics typically do not
              require cookie consent banners.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              4. Data usage
            </h2>
            <p className="text-neutral-600">
              The collected data is used solely to provide website analytics
              to the account owner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              5. Data security
            </h2>
            <p className="text-neutral-600">
              We take reasonable measures to protect collected data and
              prevent unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              6. Changes to this policy
            </h2>
            <p className="text-neutral-600">
              This privacy policy may be updated periodically. Continued use
              of the service indicates acceptance of the updated policy.
            </p>
          </section>

        </div>

      </div>
    </main>
  )
}
export default function TermsPage() {
  return (
    <main className="w-full min-h-screen bg-[#ffffff] flex justify-center items-center py-24">
      <div className="w-full">
        {/* Hero */}
        <div className="text-center mb-16 border-b border-gray-200 pb-20">
          <p className="text-sm blue-text mb-3 tracking-wide font-semibold uppercase">
            Legal
          </p>

          <h1 className="text-4xl font-semibold font-bpmf text-black mb-4">
            Terms of Service
          </h1>

          <p className="text-neutral-600 text-md max-w-xl mx-auto">
            Learn the terms that govern the use of Puffin Analytics.
            By using our service, you agree to these conditions.
          </p>

          <p className="text-sm text-neutral-500 mt-4">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto space-y-12 text-neutral-700 leading-relaxed text-[16px] px-6">
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              1. Use of the service
            </h2>
            <p className="text-neutral-600">
              Puffin Analytics provides privacy-first website analytics.
              You agree to use the service in compliance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              2. Accounts
            </h2>
            <p className="text-neutral-600">
              You are responsible for maintaining the security of your account
              and for all activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              3. Subscriptions and billing
            </h2>
            <p className="text-neutral-600">
              Puffin Analytics offers subscription plans billed monthly.
              Payments are processed through our payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              4. Acceptable use
            </h2>
            <p className="text-neutral-600">
              You may not use Puffin Analytics for illegal activities or attempt
              to abuse or disrupt the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              5. Service availability
            </h2>
            <p className="text-neutral-600">
              We aim to keep Puffin Analytics available and reliable but cannot
              guarantee uninterrupted service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              6. Termination
            </h2>
            <p className="text-neutral-600">
              We reserve the right to suspend or terminate accounts that
              violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              7. Changes
            </h2>
            <p className="text-neutral-600">
              These terms may be updated from time to time. Continued use of
              the service indicates acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
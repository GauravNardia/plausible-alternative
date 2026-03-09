import BillingCard from "@/components/pricing/BillingPage"
import { Button } from "@/components/ui/button"
import { getSiteAndCountByUserId } from "@/lib/actions/site.actions"
import Link from "next/link"

const Page = async ({ params }: Params) => {
  const userId = (await params).userid

  const { site, count: sitesUsed } = await getSiteAndCountByUserId(userId)

  if (!site) {
    return (
      <section className="min-h-screen bg-[#ffffff] text-black py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-semibold font-bpmf">
              Billing & Subscription
            </h1>
            <p className="text-neutral-600 mt-4 px-3">
              View your current plan, track usage, and upgrade anytime as your traffic grows.
              Simple pricing with no hidden fees.
            </p>
          </div>

          <div className="dot-bg h-[60px] sm:h-[80px] border-y" />

          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              No active subscription
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              You don&apos;t have an active plan yet. Choose a plan to start tracking your sites and unlock full analytics.
            </p>
            <Link href="/pricing">
              <Button className="blue primary-border text-white rounded-xl px-5 py-2 text-sm font-semibold uppercase cursor-pointer">
                View plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
  const usage = await fetch(
    `${process.env.APP_URL}/api/usage?siteId=${site.id}`,
    { cache: "no-store" }
  ).then((r) => r.json())

  return (
    <section className="min-h-screen bg-[#ffffff] text-black py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold font-bpmf">
            Billing & Subscription
          </h1>

          <p className="text-neutral-600 mt-4 px-3">
            View your current plan, track usage, and upgrade anytime as your traffic grows.
            Simple pricing with no hidden fees.
          </p>
        </div>

        <div className="dot-bg h-[60px] sm:h-[80px] border-y" />

        <div className="px-3 sm:px-0">
          <BillingCard
            usage={usage}
            sitesUsed={sitesUsed}
          />
        </div>
      </div>
    </section>
  )
}

export default Page
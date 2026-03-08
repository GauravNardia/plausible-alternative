import BillingCard from "@/components/pricing/BillingPage"
import { getSiteAndCountByUserId } from "@/lib/actions/site.actions"

const Page = async ({ params }: Params) => {
  const userId = (await params).userid

  const { site, count: sitesUsed } = await getSiteAndCountByUserId(userId)

  if (!site) {
    return <div>No site found</div>
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
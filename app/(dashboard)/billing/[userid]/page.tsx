import BillingCard from "@/components/pricing/BillingPage"
import { db } from "@/database/drizzle"
import { sites } from "@/database/schema"
import { eq } from "drizzle-orm"


const Page = async ({ params }: Params) => {
  const userid = (await params).userid

  const site = await db
    .select()
    .from(sites)
    .where(eq(sites.userId, userid))
    .limit(1)

  if (!site.length) {
    return <div>No site found</div>
  }

  const siteId = site[0].id
  const userId = site[0].userId

  // Count ALL sites for this user
const allSites = await db     
  .select()
  .from(sites)
  .where(eq(sites.userId, userId))

const sitesUsed = allSites.length

  const usage = await fetch(
    `${process.env.APP_URL}/api/usage?siteId=${siteId}`,
    { cache: "no-store" }
  ).then((res) => res.json())

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

export default Page;
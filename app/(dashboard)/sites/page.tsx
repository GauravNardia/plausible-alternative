import { auth } from "@/auth"
import SiteCard from "@/components/cards/SiteCard"
import AddDomainForm from "@/components/forms/AddDomainForm"
import { db } from "@/database/drizzle"
import { sites } from "@/database/schema"
import { getCountryCount } from "@/lib/actions/country.action"
import { getMetrics } from "@/lib/actions/site.actions"
import { normalizeDomain } from "@/lib/utils"
import { desc, eq } from "drizzle-orm"
import { redirect } from "next/navigation"

const Sites = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  // Get all sites of the user
  const userSites = await db
    .select()
    .from(sites)
    .where(eq(sites.userId, session.user.id))
    .orderBy(desc(sites.createdAt))

  if (!userSites.length) {
    return <div className="p-10 text-center">No sites found</div>
  }

  return (
    <section className="min-h-screen w-full bg-[#ffffff]">
      <div className="py-10">
        {/* Header */}
        <div className="px-6 py-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold font-bpmf tracking-tight text-gray-900">
            All your sites.
          </h1>

          <p className="mt-1 text-md text-gray-500 max-w-2xl">
            Monitor traffic, performance, and insights across every domain you track.
          </p>

          <div className="mt-6">
            <AddDomainForm/>
          </div>
        </div>

        <div className="dot-bg h-[60px] sm:h-[80px] border-y" />

        {/* Sites Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
          {await Promise.all(
            userSites.map(async (site) => {
              const metrics = await getMetrics(site.id);
              const countrycount = await getCountryCount(site.id);
              const sitedomain = normalizeDomain(site.domain)



              return (
                <SiteCard
                  key={site.id}
                  name={site.name}
                  siteId={site.id}
                  visitors={metrics?.totalVisits ?? 0}
                  pageviews={metrics?.totalPageviews ?? 0}
                  countries={countrycount.totalCountries ?? 0}
                  href={`/${sitedomain}`}
                />
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default Sites
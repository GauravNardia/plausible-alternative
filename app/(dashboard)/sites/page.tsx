import { auth } from "@/auth"
import SiteCard from "@/components/cards/SiteCard"
import AddDomainForm from "@/components/forms/AddDomainForm"
import { Button } from "@/components/ui/button"
import { getCountryCount } from "@/lib/actions/country.action"
import { getMetrics, getUserSitesWithData } from "@/lib/actions/site.actions"
import { normalizeDomain } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

const Sites = async () => {
  const session = await auth()
  if (!session?.user?.id) redirect("/sign-in")

  const { userSites, subscription } = await getUserSitesWithData(session.user.id)

  return (
    <section className="min-h-screen w-full bg-[#ffffff]">
      <div className="py-10">
        <div className="px-6 py-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold font-bpmf tracking-tight text-gray-900">
            All your sites.
          </h1>
          <p className="mt-1 text-md text-gray-500 max-w-2xl">
            Monitor traffic, performance, and insights across every domain you track.
          </p>
          <div className="mt-6">
            {subscription ? <AddDomainForm /> : (
              <Link href="/pricing">
                <Button className="blue primary-border text-white rounded-xl px-5 py-2 text-sm font-semibold uppercase">
                  Get a plan to add sites
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="dot-bg h-[60px] sm:h-[80px] border-y" />

        {!subscription ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No active subscription</h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6">You need an active plan to add and track websites.</p>
            <Link href="/pricing">
              <Button className="blue primary-border text-white rounded-xl px-5 py-2 text-sm font-semibold uppercase cursor-pointer">
                View plans
              </Button>
            </Link>
          </div>
        ) : !userSites.length ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No sites yet</h2>
            <p className="text-sm text-gray-500 max-w-sm">Add your first domain above to start tracking traffic and visitor insights.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
            {await Promise.all(
              userSites.map(async (site) => {
                const [metrics, countrycount] = await Promise.all([
                  getMetrics(site.id),
                  getCountryCount(site.id),
                ])
                return (
                  <SiteCard
                    key={site.id}
                    name={site.name}
                    siteId={site.id}
                    visitors={metrics?.totalVisits ?? 0}
                    pageviews={metrics?.totalPageviews ?? 0}
                    countries={countrycount.totalCountries ?? 0}
                    href={`/${normalizeDomain(site.domain)}`}
                  />
                )
              })
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Sites
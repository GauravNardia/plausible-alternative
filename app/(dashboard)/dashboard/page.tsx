import { auth } from '@/auth'
import { DashboardChart } from '@/components/charts/DashboarChart'
import DeviceClient from '@/components/charts/Device'
import GeoClient from '@/components/charts/GeoClient'
import SourcesTable from '@/components/charts/SourcesTable'
import TopPagesTable from '@/components/charts/TopPage'
import WorldMap from '@/components/charts/WorldMap'
import LimitTooltip from '@/components/modals/LimitTooltip'
import { db } from '@/database/drizzle'
import { sites, subscriptions } from '@/database/schema'
import { getData, getMetrics, getPages, getSources, getGeo } from '@/lib/actions/site.actions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const page = async() => {
  const session = await auth();
  if(!session?.user?.id) {
    redirect('/sign-in')
  } 

if (!session?.user?.id) {
  redirect("/sign-in")
}

const subscription = await db
  .select()
  .from(subscriptions)
  .where(eq(subscriptions.userId, session.user.id))
  .limit(1)

// if (!subscription.length || subscription[0].status !== "active") {
//   redirect("/pricing")
// }

    // 2️⃣ Get site from DB
  const site = await db
    .select()
    .from(sites)
    .where(eq(sites.userId, session.user.id))
    .limit(1)

  if (!site.length) {
    return <div>No site found</div>
  }

  const siteId = site[0].id

const usage = await fetch(
  `${process.env.APP_URL!}/api/usage?siteId=${siteId}`,
  { cache: "no-store" }
).then(res => res.json())

  const [sources, pages, devices, metrics, geo] = await Promise.all([
    getSources(siteId),
    getPages(siteId),
    getData(siteId),
    getMetrics(siteId),
    getGeo(siteId)
  ])

return (
  <section className="w-full flex flex-col justify-center max-w-6xl mx-auto mb-20">
    <LimitTooltip usage={usage.percentage} />
    <div className="dot-bg h-[60px] sm:h-[80px]" />

    <DashboardChart siteId={siteId} metrics={metrics} />

    <div className="w-full flex flex-col">
      <div className="dot-bg h-[60px] sm:h-[80px] border-b" />

      {/* Sources + Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
        <SourcesTable sources={sources} />
        <TopPagesTable pages={pages} />
      </div>

      <div className="dot-bg h-[60px] sm:h-[80px] border-t" />

      {/* Devices + Geo */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start border-y gap-4 md:gap-0">
        <DeviceClient data={devices} />
        <GeoClient data={geo} />
      </div>

      <div className="dot-bg h-[60px] sm:h-[80px] border-y" />

      {/* World Map */}
      <div className="w-full overflow-hidden">
        <WorldMap countries={geo.countries} />
      </div>
    </div>

{/* ================= PLAN + USAGE CARD ================= */}

<div className="w-full bg-white border rounded-xl p-6 mb-6">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    {/* Left: Plan Info */}
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">
        Current Plan
      </p>
      <h3 className="text-lg font-semibold text-gray-900">
        {usage.planName ?? "Starter Plan"}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {usage.limit} events per month
      </p>
    </div>

    {/* Right: Usage */}
    <div className="w-full md:w-1/2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {usage.used} / {usage.limit} events used
        </span>
        <span>{usage.percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            usage.percentage >= 100
              ? "bg-red-600"
              : usage.percentage >= 90
              ? "bg-orange-500"
              : usage.percentage >= 70
              ? "bg-yellow-500"
              : "bg-purple-600"
          }`}
          style={{ width: `${usage.percentage}%` }}
        />
      </div>

      {/* Warning States */}
      {usage.percentage >= 100 && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-700 font-medium">
            🔴 Tracking paused
          </p>
          <p className="text-xs text-red-600 mt-1">
            You've reached your monthly limit. Upgrade to resume tracking.
          </p>
        </div>
      )}

      {usage.percentage >= 90 && usage.percentage < 100 && (
        <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
          <p className="text-sm text-orange-700 font-medium">
            ⚠️ Almost there
          </p>
          <p className="text-xs text-orange-600 mt-1">
            You're about to hit your monthly limit.
          </p>
        </div>
      )}

      {usage.percentage >= 70 && usage.percentage < 90 && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
          <p className="text-sm text-yellow-700 font-medium">
            Heads up
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            You've used most of your monthly events.
          </p>
        </div>
      )}
    </div>
  </div>

  {/* Upgrade Button */}
  <div className="mt-6 flex justify-end">
    <a
      href="/pricing"
      className="text-sm px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
    >
      Upgrade Plan
    </a>
  </div>
</div>

<div className="bg-white border rounded-xl p-4 mb-6">
  <p className="text-sm text-gray-600">
    {geo?.sitesCount ?? 1} / {usage.maxSites ?? 1} sites used
  </p>
</div>
  </section>
)
}

export default page
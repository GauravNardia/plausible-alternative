import { DashboardChart } from '@/components/charts/DashboarChart'
import DeviceClient from '@/components/charts/Device'
import GeoClient from '@/components/charts/GeoClient'
import SourcesTable from '@/components/charts/SourcesTable'
import TopPagesTable from '@/components/charts/TopPage'
import WorldMap from '@/components/charts/WorldMap'
import LimitTooltip from '@/components/modals/LimitTooltip'
import { db } from '@/database/drizzle'
import { sites } from '@/database/schema'
import { getData, getMetrics, getPages, getSources, getGeo } from '@/lib/actions/site.actions'
import { eq } from 'drizzle-orm'


const page = async({ params }: Params) => {
  const sitedomain = (await params).sitedomain;

    // 2️⃣ Get site from DB
  const site = await db
    .select()
    .from(sites)
    .where(eq(sites.domain, sitedomain))
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
  </section>
)
}

export default page

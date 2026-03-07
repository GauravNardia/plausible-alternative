import DashboardShell from '@/components/charts/DashboardShell'
import { db } from '@/database/drizzle'
import { sites } from '@/database/schema'
import { getData, getPages, getSources, getGeo } from '@/lib/actions/site.actions'
import { eq } from 'drizzle-orm'

const page = async ({ params }: Params) => {
  const sitedomain = (await params).sitedomain

  const site = await db.select().from(sites)
    .where(eq(sites.domain, sitedomain)).limit(1)

  if (!site.length) return <div>No site found</div>

  const siteId = site[0].id

  const usage = await fetch(
    `${process.env.APP_URL!}/api/usage?siteId=${siteId}`,
    { cache: "no-store" }
  ).then(res => res.json())

  const [sources, pages, devices, geo] = await Promise.all([
    getSources(siteId),
    getPages(siteId),
    getData(siteId),
    getGeo(siteId),
  ])

  return (
    <section className="w-full flex flex-col justify-center max-w-6xl mx-auto mb-20">
      <DashboardShell
        siteId={siteId}
        usage={usage}
        sources={sources}
        pages={pages}
        devices={devices}
        geo={geo}
      />
    </section>
  )
}

export default page
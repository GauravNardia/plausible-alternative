import DashboardShell from '@/components/charts/DashboardShell'
import { getData, getPages, getSources, getGeo, getSiteByDomain } from '@/lib/actions/site.actions'

const page = async ({ params }: Params) => {
  const sitedomain = (await params).sitedomain
  const site = await getSiteByDomain(sitedomain)

  if (!site) return <div>No site found</div>

  const siteId = site.id

  const [usage, sources, pages, devices, geo] = await Promise.all([
    fetch(`${process.env.APP_URL!}/api/usage?siteId=${siteId}`, { cache: "no-store" }).then(r => r.json()),
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
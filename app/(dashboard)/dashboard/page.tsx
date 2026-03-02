import { DashboardChart } from '@/components/charts/DashboarChart'
import DeviceClient from '@/components/charts/Device'
import GeoClient from '@/components/charts/GeoClient'
import SourcesTable from '@/components/charts/SourcesTable'
import TopPagesTable from '@/components/charts/TopPage'

async function getSources(siteId: string) {
  const res = await fetch(
    `http://localhost:3000/api/sites/sources?siteId=${siteId}`,
    { cache: "no-store" }
  )
  const json = await res.json()
  return json.data || []
}

async function getPages(siteId: string) {
  const res = await fetch(
    `http://localhost:3000/api/sites/pages?siteId=${siteId}`,
    { cache: "no-store" }
  )
  const json = await res.json()
  return json.data || []
}

async function getData(siteId: string) {
  const res = await fetch(
    `http://localhost:3000/api/sites/devices?siteId=${siteId}`,
    { cache: "no-store" }
  )

  return res.json()
}

async function getGeo(siteId: string) {
  const res = await fetch(
    `http://localhost:3000/api/sites/geo?siteId=${siteId}`,
    { cache: "no-store" }
  )

  return res.json()
}

async function getMetrics(siteId: string) {
  const res = await fetch(
    `http://localhost:3000/api/sites/metrics?siteId=${siteId}`,
    { cache: "no-store" }
  )
  const json = await res.json()
  return json.data
}

const page = async() => {
   const siteId = "fa1786a8-41b5-47e7-b65f-df2ca7e702c0" 
const data = await getData(siteId)

  const [sources, pages, devices, metrics, geo] = await Promise.all([
    getSources(siteId),
    getPages(siteId),
    getData(siteId),
    getMetrics(siteId),
    getGeo(siteId)
  ])

  return (
    <section className='w-full flex flex-col gap-8 max-w-6xl mx-auto px-4 py-8'>
      <DashboardChart siteId={siteId} metrics={metrics} />
      <div className="grid grid-cols-2 gap-6">
        <SourcesTable sources={sources} />
        <TopPagesTable pages={pages} />
        <DeviceClient data={devices} />
        <GeoClient data={geo} />
      </div>
    </section>
  )
}

export default page
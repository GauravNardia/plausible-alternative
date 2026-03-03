"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import WorldMap from "./WorldMap"

type Item = {
  name: string
  visitors: number
}

type Props = {
  data: {
    countries: Item[]
    regions: Item[]
    cities: Item[]
  }
}

function List({
  items,
  label
}: {
  items: Item[]
  label: string
}) {
  const max = Math.max(...items.map(i => i.visitors))

  return (
    <div className="mt-6">

      {/* Header */}
      <div className="flex justify-between text-base text-gray-500 pb-4 border-b border-gray-200 text-[12px] px-2 font-semibold ">
        <span>{label}</span>
        <span>Visitors</span>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const percent = max ? (item.visitors / max) * 100 : 0

          return (
            <div
              key={item.name}
              className="relative flex items-center justify-between px-2 py-2 rounded-md overflow-hidden"
            >
              {/* Background proportional bar */}
              <div
                className="absolute inset-y-0 left-0 bg-gray-100 rounded-xl"
                style={{ width: `${percent}%` }}
              />

           <div className="relative flex items-center gap-2 z-10">
                                <span className="text-[12px] text-gray-800">
                  {item.name || "Unknown"}
                </span>
              </div>

              <div className="relative z-10 text-[12px] font-medium text-gray-700">
                {item.visitors}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function GeoClient({ data }: Props) {
  return (
    <div className="bg-neutral-100 rounded-lg p-3">

      <Tabs defaultValue="countries" className="w-full">

<TabsList className="bg-neutral-100 text-[12px] w-full justify-between rounded-none px-2">
  <div className="flex">
              <TabsTrigger
            value="map"
    className="text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:bg-none data-[state=active]:shadow-none shadow-0 data-[state=active]:border-black rounded-none"
          >
            MAP
          </TabsTrigger>

          <TabsTrigger
            value="countries"
    className="text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:bg-none data-[state=active]:shadow-none shadow-0 data-[state=active]:border-black rounded-none"
          >
            COUNTRIES
          </TabsTrigger>

          <TabsTrigger
            value="regions"
    className="text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:bg-none data-[state=active]:shadow-none shadow-0 data-[state=active]:border-black rounded-none"
          >
            REGIONS
          </TabsTrigger>

          <TabsTrigger
            value="cities"
    className="text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:bg-none data-[state=active]:shadow-none shadow-0 data-[state=active]:border-black rounded-none"
          >
            CITIES
          </TabsTrigger>

  </div>

        </TabsList>

        <TabsContent value="countries">
          <List items={data.countries} label="Country" />
        </TabsContent>

        <TabsContent value="regions">
          <List items={data.regions} label="Region" />
        </TabsContent>

        <TabsContent value="cities">
          <List items={data.cities} label="City" />
        </TabsContent>

        <TabsContent value="map">
          <div className="mt-6 text-gray-500 text-sm">
            <WorldMap countries={data.countries} />
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
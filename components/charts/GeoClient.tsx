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
      <div className="flex justify-between text-sm text-gray-500 pb-4 border-b border-gray-200">
        <span>{label}</span>
        <span>Visitors</span>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const percent = max ? (item.visitors / max) * 100 : 0

          return (
            <div
              key={item.name}
              className="relative flex items-center justify-between px-4 py-4 rounded-xl overflow-hidden"
            >
              {/* Background proportional bar */}
              <div
                className="absolute inset-y-0 left-0 bg-gray-100 rounded-xl"
                style={{ width: `${percent}%` }}
              />

              <div className="relative z-10 text-gray-800 font-medium">
                {item.name || "Unknown"}
              </div>

              <div className="relative z-10 text-gray-700 font-medium">
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      <Tabs defaultValue="countries" className="w-full">

        <TabsList className="bg-white border-b border-gray-200 w-full justify-start gap-8 rounded-none p-0">
          <TabsTrigger
            value="map"
            className="px-0 pb-3 text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
          >
            MAP
          </TabsTrigger>

          <TabsTrigger
            value="countries"
            className="px-0 pb-3 text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
          >
            COUNTRIES
          </TabsTrigger>

          <TabsTrigger
            value="regions"
            className="px-0 pb-3 text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
          >
            REGIONS
          </TabsTrigger>

          <TabsTrigger
            value="cities"
            className="px-0 pb-3 text-gray-500 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
          >
            CITIES
          </TabsTrigger>
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
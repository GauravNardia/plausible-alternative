"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"

type Item = { name: string; visitors: number }
type Props = { data: { countries: Item[]; regions: Item[]; cities: Item[] } }

function List({ items, label, limit }: { items: Item[]; label: string; limit?: number }) {
  const displayed = limit ? items.slice(0, limit) : items
  const max = Math.max(...items.map(i => i.visitors))

  return (
    <div className="mt-4">
      <div className="flex justify-between text-gray-500 pb-4 border-b border-gray-200 text-[12px] px-2 font-semibold">
        <span>{label}</span>
        <span>Visitors</span>
      </div>
      <div className="mt-4 space-y-2">
        {displayed.map((item) => {
          const percent = max ? (item.visitors / max) * 100 : 0
          return (
            <div key={item.name} className="relative flex items-center justify-between px-2 py-2 rounded-md overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gray-100 rounded-xl" style={{ width: `${percent}%` }} />
              <span className="relative z-10 text-sm text-gray-800">{item.name || "Unknown"}</span>
              <span className="relative z-10 text-sm font-medium text-gray-700">{item.visitors}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const triggerClass = "text-[12px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:shadow-none data-[state=active]:border-black rounded-none"

export default function GeoClient({ data }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-neutral-100 p-4 h-[280px] flex flex-col">
        <Tabs defaultValue="countries" className="w-full">
          <TabsList className="bg-neutral-100 text-sm w-full justify-between rounded-none px-2">
            <div className="flex">
              <TabsTrigger value="countries" className={triggerClass}>COUNTRIES</TabsTrigger>
              <TabsTrigger value="regions" className={triggerClass}>REGIONS</TabsTrigger>
              <TabsTrigger value="cities" className={triggerClass}>CITIES</TabsTrigger>
            </div>
            <button onClick={() => setOpen(true)} className="hover:opacity-70 transition">
              <Image src="/assets/icons/full.svg" alt="Expand" width={20} height={20} />
            </button>
          </TabsList>
          <TabsContent value="countries"><List items={data.countries} label="Country" limit={5} /></TabsContent>
          <TabsContent value="regions"><List items={data.regions} label="Region" limit={5} /></TabsContent>
          <TabsContent value="cities"><List items={data.cities} label="City" limit={5} /></TabsContent>
        </Tabs>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-neutral-100">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Countries / Regions / Cities</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="countries" className="w-full">
            <TabsList className="bg-neutral-100 w-full justify-start rounded-none px-0">
              <TabsTrigger value="countries" className={triggerClass}>COUNTRIES</TabsTrigger>
              <TabsTrigger value="regions" className={triggerClass}>REGIONS</TabsTrigger>
              <TabsTrigger value="cities" className={triggerClass}>CITIES</TabsTrigger>
            </TabsList>
            <div className="max-h-[60vh] overflow-y-auto">
              <TabsContent value="countries"><List items={data.countries} label="Country" /></TabsContent>
              <TabsContent value="regions"><List items={data.regions} label="Region" /></TabsContent>
              <TabsContent value="cities"><List items={data.cities} label="City" /></TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
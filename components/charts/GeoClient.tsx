"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"

type Item = { name: string; visitors: number }
type Props = { data: { countries: Item[]; regions: Item[]; cities: Item[] } }

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const getCountryName = (code: string) => {
  try { return regionNames.of(code) ?? code } catch { return code }
}

const safeDecodeCity = (name: string) => {
  try { return decodeURIComponent(name) } catch { return name }
}


function List({ items, label, limit }: { items: Item[]; label: string; limit?: number }) {
  const displayed = limit ? items.slice(0, limit) : items

  // SAME LOGIC AS DEVICE
  const max = Math.max(...displayed.map(i => i.visitors), 1)
  const total = items.reduce((sum, i) => sum + Number(i.visitors), 0)

  const displayName = (name: string) => {
    if (!name) return "Unknown"
    if (label === "Country") return getCountryName(name)
    if (label === "City") return safeDecodeCity(name)
    return name
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex justify-between text-gray-500 pb-4 border-b border-gray-200 text-[12px] px-2 font-semibold">
        <h2 className="text-sm font-semibold text-neutral-500">{label}</h2>
        <h2 className="text-sm font-semibold text-neutral-500">Visitors</h2>
      </div>

      {/* List */}
      <div className="mt-4 space-y-3">
        {displayed.map((item) => {
          const percent = (item.visitors / max) * 100
         const share = total ? (item.visitors / total) * 100 : 0

          return (
            <div
              key={item.name}
              className="group grid grid-cols-[1fr_80px] items-center rounded-md transition"
            >
              {/* LEFT: BAR AREA */}
              <div className="w-full py-2 relative flex">
                
                {/* EXACT SAME BAR AS DEVICE */}
                <div
                  className="absolute left-0 top-0 h-full bg-neutral-200/60 rounded-md transition-all duration-700 ease-out"
                  style={{ width: `${percent}%` }}
                />

                <span className="relative z-10 text-sm text-gray-800 pl-2">
                  {displayName(item.name)}
                </span>
              </div>

              {/* RIGHT */}
              <div className="flex justify-end items-center gap-2 tabular-nums">
                <span className="text-sm font-medium text-gray-700 text-right">
                  {item.visitors}
                </span>

                <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {
                    share < 1 && share > 0
                      ? `${share.toFixed(1)}%`
                      : `${Math.round(share)}%`
                  }
                </span>
              </div>
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
      <div className="bg-neutral-100 p-4 h-[350px] flex flex-col">
        <Tabs defaultValue="countries" className="w-full">
          <TabsList className="bg-neutral-100 text-sm w-full justify-between rounded-none px-2">
            <div className="flex">
              <TabsTrigger value="countries" className={triggerClass}>COUNTRIES</TabsTrigger>
              <TabsTrigger value="regions" className={triggerClass}>REGIONS</TabsTrigger>
              <TabsTrigger value="cities" className={triggerClass}>CITIES</TabsTrigger>
            </div>
            <button onClick={() => setOpen(true)} className="hover:opacity-70 transition">
              <Image src="/assets/icons/full.svg" alt="Expand" className="cursor-pointer" width={20} height={20} />
            </button>
          </TabsList>
          <TabsContent value="countries">
            <List items={data.countries} label="Country" limit={5} />
          </TabsContent>
          <TabsContent value="regions"><List items={data.regions} label="Region" limit={4} /></TabsContent>
          <TabsContent value="cities"><List items={data.cities} label="City" limit={4} /></TabsContent>
        </Tabs>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-2xl bg-neutral-100" showCloseButton={false}>
  <DialogHeader className="flex flex-row items-center justify-between">
    <DialogTitle className="text-sm font-semibold">Top Pages</DialogTitle>
    <DialogClose asChild>
      <Button variant="outline" className="text-sm text-neutral-400 hover:text-neutral-800 border border-neutral-200  p-2 rounded-xl focus:ring-0 cursor-pointer transition-all">
        <Image src="/assets/icons/close.svg" width={20} height={20} alt="close" />
      </Button>
    </DialogClose>
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
"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "../ui/button"
import { useState } from "react"
import Image from "next/image"

type Item = {
  name: string
  count: number
}

type Props = {
  data: {
    browsers: Item[]
    os: Item[]
    devices: Item[]
  }
}

/* ---------- Browser Icon ---------- */

function BrowserIcon({ name }: { name: string }) {
  const lower = name.toLowerCase()

  if (lower.includes("chrome")) return <img src="/icons/chrome.png" className="w-6 h-6" />
  if (lower.includes("safari")) return <img src="/icons/safari.png" className="w-6 h-6" />
  if (lower.includes("firefox")) return <img src="/icons/firefox.png" className="w-6 h-6" />
  if (lower.includes("edge")) return <img src="/icons/edge.png" className="w-6 h-6" />
  if (lower.includes("opera")) return <img src="/icons/opera.png" className="w-6 h-6" />

  return <div className="w-6 h-6 rounded-full bg-gray-200" />
}

/* ---------- List ---------- */

function List({ items, label }: { items: Item[]; label: string }) {
  const max = Math.max(...items.map(i => i.count))

  return (
    <div className="mt-6">

      {/* Header */}
      <div className="flex justify-between text-base text-gray-500 pb-4 border-b border-gray-200 text-[12px] px-2 font-semibold ">
        <span>{label}</span>
        <span>Visitors</span>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const percent = max ? (item.count / max) * 100 : 0

          return (
            <div
              key={item.name}
              className="relative flex items-center justify-between px-2 py-2 rounded-md overflow-hidden"
            >
              {/* Background proportional fill */}
              <div
                className="absolute inset-y-0 left-0 bg-gray-200 rounded-sm"
                style={{ width: `${percent}%` }}
              />

              {/* Content */}
              <div className="relative flex items-center gap-2 z-10">

                <span className="text-[12px] text-gray-800">
                  {item.name}
                </span>
              </div>

              <div className="relative z-10 text-[12px] font-medium text-gray-700">
                {item.count}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Main ---------- */

export default function DeviceClient({ data }: Props) {
    const [activeTab, setActiveTab] = useState("browsers")
  return (
    <div className="bg-neutral-100 rounded-lg p-3">
      <Tabs
  value={activeTab}
  onValueChange={setActiveTab}
  className="w-full"
>

        {/* Tabs */}
<TabsList className="bg-neutral-100 text-[12px] w-full justify-between rounded-none px-2">
   <div className="flex ">
      <TabsTrigger
    value="browsers"
    className="text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:bg-none data-[state=active]:shadow-none shadow-0 data-[state=active]:border-black rounded-none"
  >
    BROWSERS
  </TabsTrigger>

  <TabsTrigger
    value="os"
    className="text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:bg-none data-[state=active]:shadow-none shadow-0 data-[state=active]:border-black rounded-none"
  >
    OPERATING SYSTEMS
  </TabsTrigger>

  <TabsTrigger
    value="devices"
    className="text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:bg-none data-[state=active]:shadow-none shadow-0 data-[state=active]:border-black rounded-none"
  >
    DEVICES
  </TabsTrigger>
   </div>

   <div>
      <Image
        src="/assets/icons/full.svg"
        alt="Expand"
        width={20}
        height={20}
      />
   </div>
</TabsList>
        <TabsContent value="browsers">
          <List items={data.browsers} label="Browsers" />
        </TabsContent>

        <TabsContent value="os">
          <List items={data.os} label="Operating Systems" />
        </TabsContent>

        <TabsContent value="devices">
          <List items={data.devices} label="Devices"  />
        </TabsContent>

      </Tabs>
    </div>
  )
}
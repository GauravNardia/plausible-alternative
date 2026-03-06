"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"

type Item = { name: string; count: number }
type Props = {
  data: { browsers: Item[]; os: Item[]; devices: Item[] }
}

function List({ items, label, limit }: { items: Item[]; label: string; limit?: number }) {
  const displayed = limit ? items.slice(0, limit) : items
  const max = Math.max(...items.map(i => i.count))

  return (
    <div className="mt-4">
      <div className="flex justify-between text-gray-500 pb-4 border-b border-gray-200 text-[12px] px-2 font-semibold">
        <span>{label}</span>
        <span>Visitors</span>
      </div>
      <div className="mt-4 space-y-2">
        {displayed.map((item) => {
          const percent = max ? (item.count / max) * 100 : 0
          return (
            <div key={item.name} className="relative flex items-center justify-between px-2 py-2 rounded-md overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gray-200 rounded-sm" style={{ width: `${percent}%` }} />
              <span className="relative z-10 text-[12px] text-gray-800">{item.name}</span>
              <span className="relative z-10 text-[12px] font-medium text-gray-700">{item.count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const triggerClass = "text-[10px] text-neutral-500 data-[state=active]:bg-neutral-100 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:shadow-none data-[state=active]:border-black rounded-none"

export default function DeviceClient({ data }: Props) {
  const [activeTab, setActiveTab] = useState("browsers")
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-neutral-100 p-4 h-[280px] flex flex-col border-r">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-neutral-100 text-[12px] w-full justify-between rounded-none px-2">
            <div className="flex">
              <TabsTrigger value="browsers" className={triggerClass}>BROWSERS</TabsTrigger>
              <TabsTrigger value="os" className={triggerClass}>OPERATING SYSTEMS</TabsTrigger>
              <TabsTrigger value="devices" className={triggerClass}>DEVICES</TabsTrigger>
            </div>
            <button onClick={() => setOpen(true)} className="hover:opacity-70 transition">
              <Image src="/assets/icons/full.svg" alt="Expand" width={20} height={20} />
            </button>
          </TabsList>
          <TabsContent value="browsers"><List items={data.browsers} label="Browsers" limit={6} /></TabsContent>
          <TabsContent value="os"><List items={data.os} label="Operating Systems" limit={6} /></TabsContent>
          <TabsContent value="devices"><List items={data.devices} label="Devices" limit={6} /></TabsContent>
        </Tabs>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-neutral-100">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Browsers / OS / Devices</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="browsers" className="w-full">
            <TabsList className="bg-neutral-100 w-full justify-start rounded-none px-0">
              <TabsTrigger value="browsers" className={triggerClass}>BROWSERS</TabsTrigger>
              <TabsTrigger value="os" className={triggerClass}>OPERATING SYSTEMS</TabsTrigger>
              <TabsTrigger value="devices" className={triggerClass}>DEVICES</TabsTrigger>
            </TabsList>
            <div className="max-h-[60vh] overflow-y-auto">
              <TabsContent value="browsers"><List items={data.browsers} label="Browsers" /></TabsContent>
              <TabsContent value="os"><List items={data.os} label="Operating Systems" /></TabsContent>
              <TabsContent value="devices"><List items={data.devices} label="Devices" /></TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
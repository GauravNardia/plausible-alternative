"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"

type Item = { name: string; count: number }
type Props = {
  data: { browsers: Item[]; os: Item[]; devices: Item[] }
}

function formatLabel(str: string) {
  if (!str) return "Other";

  const lower = str.toLowerCase();

  // OS fixes
  if (lower.includes("mac")) return "MacOS";
  if (lower === "ios") return "iOS";
  if (lower === "windows") return "Windows";
  if (lower === "android") return "Android";

  // Browser fixes
  if (lower === "chrome") return "Chrome";
  if (lower === "safari") return "Safari";

  // Device fixes
  if (lower === "mobile") return "Mobile";
  if (lower === "desktop") return "Desktop";
  if (lower === "tablet") return "Tablet";

  // fallback
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function normalizeAndMerge(items: Item[]): Item[] {
  const map = new Map<string, number>();

  for (const item of items) {
    const key = formatLabel(item.name);
    map.set(key, (map.get(key) || 0) + item.count);
  }

  return Array.from(map.entries()).map(([name, count]) => ({
    name,
    count,
  }));
}

function List({ items, label, limit }: { items: Item[]; label: string; limit?: number }) {
  const normalizedItems = normalizeAndMerge(items)

  const displayed = limit
    ? normalizedItems.slice(0, limit)
    : normalizedItems

  const max = Math.max(...normalizedItems.map(i => i.count), 1)

  const total = normalizedItems.reduce((sum, i) => sum + Number(i.count), 0)

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="text-sm flex justify-between text-gray-500 pb-4 border-b border-gray-200 text-[12px] px-2 font-semibold">
        <h2 className="text-sm font-semibold text-neutral-500">{label}</h2>
        <h2 className="text-sm font-semibold text-neutral-500">Visitors</h2>
      </div>

      {/* List */}
      <div className="mt-4 space-y-3">
        {displayed.map((item) => {
          const percent = (item.count / max) * 100
          const share = total ? (Number(item.count) / total) * 100 : 0

          return (
              <div
              key={item.name}
              className="group flex items-center gap-3 px-2 rounded-md transition "
            >
              {/* LEFT: BAR AREA */}
              <div className="w-full py-2 relative flex">
                
                {/* Background bar */}
                <div
                  className="absolute left-0 top-0 h-full bg-neutral-200/60 rounded-md transition-all duration-700 ease-out"
                  style={{ width: `${percent}%` }}
                />

                {/* Label */}
                <span className="relative z-10 text-sm text-gray-800 pl-2">
                  {formatLabel(item.name)}
                </span>
              </div>

              {/* RIGHT: FIXED VALUE COLUMN */}
              <div className="flex items-center gap-2 min-w-[72px] justify-end tabular-nums">
                <span className="text-sm text-center flex items-center justify-center font-medium text-gray-700">
                  {Number(item.count)}
                </span>

                <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {Math.round(share)}%
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

export default function DeviceClient({ data }: Props) {
  const [activeTab, setActiveTab] = useState("browsers")
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-neutral-100 p-4 h-[350px] flex flex-col border-r">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-neutral-100 text-[12px] w-full justify-between rounded-none px-2">
            <div className="flex">
              <TabsTrigger value="browsers" className={triggerClass}>BROWSERS</TabsTrigger>
              <TabsTrigger value="os" className={triggerClass}>OPERATING SYSTEMS</TabsTrigger>
              <TabsTrigger value="devices" className={triggerClass}>DEVICES</TabsTrigger>
            </div>
            <button onClick={() => setOpen(true)} className="hover:opacity-70 transition">
              <Image src="/assets/icons/full.svg" alt="Expand" className="cursor-pointer" width={20} height={20} />
            </button>
          </TabsList>
          <TabsContent value="browsers"><List items={data.browsers} label="Browsers" limit={4} /></TabsContent>
          <TabsContent value="os"><List items={data.os} label="Operating Systems" limit={4} /></TabsContent>
          <TabsContent value="devices"><List items={data.devices} label="Devices" limit={4} /></TabsContent>
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
"use client"
import Image from "next/image"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

interface Source {
  name: string
  visitors: number
}

function formatSource(name?: string) {
  if (!name || name === "Direct") return "Direct"
  const lower = name.toLowerCase()
  if (lower.includes("google")) return "Google"
  if (lower.includes("t.co") || lower.includes("twitter")) return "Twitter"
  if (lower.includes("linkedin")) return "LinkedIn"
  if (lower.includes("reddit")) return "Reddit"
  if (lower.includes("peerlist")) return "Peerlist"
  return name.replace("www.", "")
}

/**
 * Clean % formatter (no 1.0%, no fake 0.1)
 */
function formatPercent(value: number) {
  if (value > 0 && value < 1) return "<1"
  return `${Math.round(value)}%`
}

function SourceRow({
  source,
  max,
  total,
}: {
  source: Source
  max: number
  total: number
}) {
  const percent = max ? (source.visitors / max) * 100 : 0

  // 🔥 CORRECT share (always percentage)
  const shareRaw = total ? source.visitors / total : 0
  const share = shareRaw * 100

  return (
    <div className="group flex items-center gap-3 px-2 rounded-md hover:bg-neutral-200/20 transition">
      
      {/* LEFT BAR */}
      <div className="w-full py-2 relative flex overflow-hidden rounded-md">
        <div
          className="absolute left-0 top-0 h-full bg-neutral-200/60 transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />

        <span className="relative z-10 text-sm text-gray-800 pl-2">
          {formatSource(source.name)}
        </span>
      </div>

      {/* RIGHT VALUES */}
      <div className="flex items-center justify-end gap-2 min-w-[80px] tabular-nums">
        <span className="text-sm font-medium text-gray-700">
          {source.visitors}
        </span>

        <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
          {formatPercent(share)}
        </span>
      </div>
    </div>
  )
}

export default function SourcesTable({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false)

  // ✅ SORT FIRST
  const sorted = [...sources].sort((a, b) => b.visitors - a.visitors)

  // ✅ CARD (top 5)
  const displayed = sorted.slice(0, 5)
  const max = Math.max(...displayed.map((s) => s.visitors), 1)

  // 🔥 IMPORTANT: % based on visible (fixes your issue)
  const total = displayed.reduce((sum, s) => sum + s.visitors, 0)

  // ✅ MODAL (full data)
  const fullMax = Math.max(...sorted.map((s) => s.visitors), 1)
  const fullTotal = sorted.reduce((sum, s) => sum + s.visitors, 0)

  return (
    <>
      {/* CARD */}
      <div className="bg-neutral-100 p-4 h-[350px] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Top Sources</h2>
          <button onClick={() => setOpen(true)} className="hover:opacity-70 transition">
            <Image src="/assets/icons/full.svg" alt="Expand" width={20} height={20} />
          </button>
        </div>

        <div className="flex justify-between px-2 py-2 border-b border-gray-200 text-neutral-500 text-sm font-semibold">
          <span>Sources</span>
          <span>Visitors</span>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {displayed.map((source, index) => (
            <SourceRow
              key={index}
              source={source}
              max={max}
              total={total} // ✅ visible total
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-2xl bg-neutral-100" showCloseButton={false}>
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-sm font-semibold">
              Top Sources
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="outline" className="p-2 rounded-xl border border-neutral-200">
                <Image src="/assets/icons/close.svg" width={20} height={20} alt="close" />
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="flex justify-between py-2 border-b border-gray-200 text-neutral-500 text-sm font-semibold">
            <span>Sources</span>
            <span>Visitors</span>
          </div>

          <div className="flex flex-col gap-3 mt-4 max-h-[60vh] overflow-y-auto">
            {sorted.map((source, index) => (
              <SourceRow
                key={index}
                source={source}
                max={fullMax}
                total={fullTotal} // ✅ global total
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
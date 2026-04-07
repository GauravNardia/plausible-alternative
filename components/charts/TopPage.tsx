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

interface Page {
  path: string
  visitors: number
}

function PageRow({
  page,
  max,
  total,
}: {
  page: Page
  max: number
  total: number
}) {
  const percent = max ? (page.visitors / max) * 100 : 0
  const share = total ? (page.visitors / total) * 100 : 0

  // 👉 same logic as your Sources (clean, no noise)
  const formatted = share < 1 ? "<1%" : `${Math.round(share)}%`

  return (
    <div className="group flex items-center gap-3 px-2 rounded-md transition hover:bg-neutral-200/20">
      
      {/* LEFT BAR */}
      <div className="w-full py-2 relative flex overflow-hidden rounded-md">
        <div
          className="absolute left-0 top-0 h-full bg-neutral-200/60 transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />

        <span className="relative z-10 text-sm text-gray-800 pl-2 truncate">
          {page.path || "/"}
        </span>
      </div>

      {/* RIGHT VALUES */}
      <div className="flex items-center justify-end gap-2 min-w-[80px] tabular-nums">
        <span className="text-sm font-medium text-gray-700">
          {page.visitors}
        </span>

        {/* % on hover */}
        <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
          {formatted}
        </span>
      </div>
    </div>
  )
}

export default function TopPagesTable({ pages }: { pages: Page[] }) {
  const [open, setOpen] = useState(false)

  // ✅ SORT
  const sorted = [...pages].sort((a, b) => b.visitors - a.visitors)

  // ✅ CARD (top 5)
  const displayed = sorted.slice(0, 5)
  const max = Math.max(...displayed.map((p) => p.visitors), 1)
  const total = displayed.reduce((sum, p) => sum + p.visitors, 0)

  // ✅ MODAL (full)
  const fullMax = Math.max(...sorted.map((p) => p.visitors), 1)
  const fullTotal = sorted.reduce((sum, p) => sum + p.visitors, 0)

  return (
    <>
      {/* CARD */}
      <div className="bg-neutral-100 p-3 border-l h-[350px] flex flex-col">
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Top Pages</h2>
          <button
            onClick={() => setOpen(true)}
            className="hover:opacity-70 transition"
          >
            <Image
              src="/assets/icons/full.svg"
              alt="Expand"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-200 text-neutral-500 text-sm font-semibold">
          <span>Pages</span>
          <span>Visitors</span>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {displayed.map((page, index) => (
            <PageRow
              key={index}
              page={page}
              max={max}
              total={total}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-2xl bg-neutral-100" showCloseButton={false}>
          
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-sm font-semibold">
              Top Pages
            </DialogTitle>

            <DialogClose asChild>
              <Button
                variant="outline"
                className="p-2 rounded-xl border border-neutral-200"
              >
                <Image
                  src="/assets/icons/close.svg"
                  width={20}
                  height={20}
                  alt="close"
                />
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="flex justify-between py-2 border-b border-gray-200 text-neutral-500 text-sm font-semibold">
            <span>Pages</span>
            <span>Visitors</span>
          </div>

          <div className="flex flex-col gap-3 mt-4 max-h-[60vh] overflow-y-auto">
            {sorted.map((page, index) => (
              <PageRow
                key={index}
                page={page}
                max={fullMax}
                total={fullTotal}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
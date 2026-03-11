"use client"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Page {
  path: string
  visitors: number
}

function PageRow({ page }: { page: Page }) {
  return (
    <div className="flex justify-between p-2 text-sm text-neutral-700">
      <span>{page.path}</span>
      <span className="font-medium">{page.visitors}</span>
    </div>
  )
}

export default function TopPagesTable({ pages }: { pages: Page[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-neutral-100 p-3 border-l h-[350px]">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-sm font-semibold">Top Pages</h2>
          <button onClick={() => setOpen(true)} className="hover:opacity-70 transition mb-4">
            <Image src="/assets/icons/full.svg" alt="Expand" width={20} height={20} />
          </button>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-neutral-500">Pages</h2>
          <h2 className="text-sm font-semibold text-neutral-500">Visitors</h2>
        </div>
        <div className="flex flex-col gap-3">
          {pages.slice(0, 5).map((page, index) => (
            <PageRow key={index} page={page} />
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-neutral-100">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Top Pages</DialogTitle>
          </DialogHeader>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-neutral-500">Pages</h2>
            <h2 className="text-sm font-semibold text-neutral-500">Visitors</h2>
          </div>
          <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
            {pages.map((page, index) => (
              <PageRow key={index} page={page} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
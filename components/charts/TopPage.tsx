"use client"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"

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
            <Image src="/assets/icons/full.svg" alt="Expand" className="cursor-pointer" width={20} height={20} />
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
        <DialogContent className="max-w-2xl rounded-2xl bg-neutral-100" showCloseButton={false}>
  <DialogHeader className="flex flex-row items-center justify-between">
    <DialogTitle className="text-sm font-semibold">Top Pages</DialogTitle>
    <DialogClose asChild>
      <Button variant="outline" className="text-sm text-neutral-400 hover:text-neutral-800 border border-neutral-200  p-2 rounded-xl focus:ring-0 cursor-pointer transition-all">
        <Image src="/assets/icons/close.svg" width={20} height={20} alt="close" />
      </Button>
    </DialogClose>
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
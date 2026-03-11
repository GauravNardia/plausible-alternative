"use client"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"

interface Source {
  name: string
  visitors: number
}

function formatSource(name?: string) {
  if (!name || name === "Direct") return "Direct"
  const lower = name.toLowerCase()
  if (lower.includes("google")) return "Google"
  if (lower.includes("t.co")) return "Twitter"
  if (lower.includes("twitter")) return "Twitter"
  if (lower.includes("linkedin")) return "LinkedIn"
  if (lower.includes("reddit")) return "Reddit"
  if (lower.includes("peerlist")) return "Peerlist"
  return name.replace("www.", "")
}

function SourceRow({ source }: { source: Source }) {
  return (
    <div className="flex justify-between text-sm p-2 text-neutral-700">
      <span>{formatSource(source.name)}</span>
      <span className="font-medium">{source.visitors}</span>
    </div>
  )
}

export default function SourcesTable({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-neutral-100 p-4 h-[350px] flex flex-col">
        <div className="flex items-center justify-between pb-">
          <h2 className="text-sm font-semibold">Top Sources</h2>
          <button onClick={() => setOpen(true)} className="hover:opacity-70 transition mb-4">
            <Image src="/assets/icons/full.svg" alt="Expand" className="cursor-pointer" width={20} height={20} />
          </button>
        </div>
        <div className="flex justify-between items-center px-2 py-2 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-neutral-500">Sources</h2>
          <h2 className="text-sm font-semibold text-neutral-500">Visitors</h2>
        </div>
        <div className="flex flex-col gap-3">
          {sources.slice(0, 5).map((source, index) => (
            <SourceRow key={index} source={source} />
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-2xl bg-neutral-100" showCloseButton={false}>
  <DialogHeader className="flex flex-row items-center justify-between">
    <DialogTitle className="text-sm font-semibold">Top Sources</DialogTitle>
    <DialogClose asChild>
      <Button variant="outline" className="text-sm text-neutral-400 hover:text-neutral-800 border border-neutral-200  p-2 rounded-xl focus:ring-0 cursor-pointer transition-all">
        <Image src="/assets/icons/close.svg" width={20} height={20} alt="close" />
      </Button>
    </DialogClose>
  </DialogHeader>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-neutral-500">Sources</h2>
            <h2 className="text-sm font-semibold text-neutral-500">Visitors</h2>
          </div>
          <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
            {sources.map((source, index) => (
              <SourceRow key={index} source={source} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
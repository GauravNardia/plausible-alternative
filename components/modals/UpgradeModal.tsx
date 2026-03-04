"use client"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { on } from "node:stream"

type Props = {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export default function UpgradeModal({
  isOpen,
  onClose,
  title,
  description,
}: Props) {
  if (!isOpen) return null
  const router = useRouter()

  const handleUpgrade = () => {
    onClose()
    router.push("/pricing")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-neutral-100 rounded-2xl shadow-xl p-1 relative">
        <div className="bg-[#ffffff] px-3 py-8 rounded-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <h2 className="text-xl font-semibold text-gray-900">
          {title ?? "Upgrade Required"}
        </h2>

        <p className="text-sm text-gray-600 mt-3">
          {description ??
            "You've reached the limit of your current plan. Upgrade to continue."}
        </p>

        </div>
        {/* Actions */}
        <div className="my-3 mx-3 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-xl py-2 text-sm cursor-pointer"
          >
            Cancel
          </button>

          <Button onClick={handleUpgrade} className="flex-1 blue blue-border text-white rounded-xl py-2 text-sm text-center hover:opacity-90 transition cursor-pointer">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  )
}
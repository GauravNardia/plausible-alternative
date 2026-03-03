"use client"

import { X } from "lucide-react"

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">

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

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 text-sm"
          >
            Cancel
          </button>

          <a
            href="/pricing"
            className="flex-1 bg-black text-white rounded-lg py-2 text-sm text-center hover:opacity-90 transition"
          >
            Upgrade Plan
          </a>
        </div>
      </div>
    </div>
  )
}
"use client"

import { TooltipProps } from "recharts"

export function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-3 shadow-xl min-w-[180px]">
      
      <p className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase mb-2">
        Visitors
      </p>

      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span>{label}</span>
        </div>

        <span className="text-sm font-semibold text-neutral-900">
          {payload[0].value}
        </span>
      </div>

    </div>
  )
}
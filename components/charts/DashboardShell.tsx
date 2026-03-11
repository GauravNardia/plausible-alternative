"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { DashboardChart } from "./DashboarChart"
import SourcesTable from "./SourcesTable"
import TopPagesTable from "./TopPage"
import DeviceClient from "./Device"
import GeoClient from "./GeoClient"
import WorldMap from "./WorldMap"
import LimitTooltip from "../modals/LimitTooltip"


export const FILTERS = [
  { key: "today",     label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7d",        label: "Last 7 Days" },
  { key: "30d",       label: "Last Month" },
  { key: "180d",      label: "Last 6 Months" },
  { key: "365d",      label: "Last 12 Months" },
]

export default function DashboardShell({
  siteId, usage, sources, pages, devices, geo,
}: {
  siteId: string
  usage: any
  sources: any
  pages: any
  devices: any
  geo: any
}) {
  const [filter, setFilter] = useState("today")
  const [open, setOpen]     = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detect user's local timezone once on mount
  // e.g. "Asia/Kolkata", "America/New_York", "Europe/London"
  const [timezone] = useState(() =>
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  useEffect(() => { setMounted(true) }, [])

  const selectedLabel = FILTERS.find(f => f.key === filter)?.label ?? "Today"

  // This dropdown is portalled INTO the navbar slot in layout.tsx
  const filterDropdown = (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-700 bg-white border border-gray-200 rounded-xl px-4 py-1.5 hover:bg-neutral-50 transition"
      >
        {selectedLabel}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-md z-50 py-1 overflow-hidden">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => { setFilter(f.key); setOpen(false) }}
              className={`w-full text-left px-4 py-2 text-sm transition hover:bg-neutral-50
                ${filter === f.key
                  ? "font-semibold text-[#5851ed] bg-neutral-50"
                  : "text-neutral-600"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  const slot = mounted ? document.getElementById("dashboard-filter-slot") : null

  return (
    <>
      {slot && createPortal(filterDropdown, slot)}

      <LimitTooltip usage={usage.percentage} hasSubscription={usage.hasSubscription} />
      <div className="dot-bg h-[60px] sm:h-[80px]" />

      {/* Pass filter + timezone down to chart */}
      <DashboardChart siteId={siteId} filter={filter} timezone={timezone} />

      <div className="w-full flex flex-col">
        <div className="dot-bg h-[60px] sm:h-[80px] border-b" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
          <SourcesTable sources={sources} />
          <TopPagesTable pages={pages} />
        </div>
        <div className="dot-bg h-[60px] sm:h-[80px] border-t" />
        <div className="grid grid-cols-1 md:grid-cols-2 items-start border-t gap-4 md:gap-0">
          <DeviceClient data={devices} />
          <GeoClient data={geo} />
        </div>
        <div className="dot-bg h-[60px] sm:h-[80px] border-y" />
        <div className="w-full overflow-hidden">
          <WorldMap countries={geo.countries} />
        </div>
      </div>
    </>
  )
}
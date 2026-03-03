"use client"

import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { CustomTooltip } from "./Tooltip"
import { Metric } from "./Metrics"
import { formatNumber } from "@/lib/utils"

interface ChartData {
  hour: string
  count: number
}

export const DashboardChart = ({ siteId, metrics }: { siteId: string, metrics: any }) => {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/sites/analytics?siteId=${siteId}`)
        const json = await res.json()

        // Generate full 24 hours
        const hours = Array.from({ length: 24 }, (_, i) =>
          i.toString().padStart(2, "0") + ":00"
        )

        const formatted = hours.map(hour => {
          const found = json.data.find((d: any) => d.hour === hour)
          return {
            hour,
            count: found ? Number(found.count) : 0
          }
        })

        setData(formatted)
        setLoading(false)

      } catch (err) {
        console.error("Chart error:", err)
        setLoading(false)
      }
    }

    fetchData()
  }, [siteId])

  if (loading) {
    return (
      <div className="w-full min-h-[420px] flex items-center justify-center">
        Loading analytics...
      </div>
    )
  }

  return (
    <div className="w-full bg-neutral-100 rounded-3xl p-8">
      <div className="grid grid-cols-4 mb-8">
  <Metric
    title="Unique Visitors"
    value={formatNumber(metrics.uniqueVisitors)}
  />
  <Metric
    title="Total Visits"
    value={formatNumber(metrics.totalVisits)}
  />
  <Metric
    title="Total Pageviews"
    value={formatNumber(metrics.totalPageviews)}
  />
  <Metric
    title="Views per Visit"
    value={metrics.viewsPerVisit}
  />
</div>
      <div className="w-full h-[300px] md:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#5851ed" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#5851ed" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#E2E2E2" vertical={false} />

            <XAxis dataKey="hour" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />

            <Tooltip cursor={false} content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#5851ed"
              strokeWidth={2}
              fill="url(#lightGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
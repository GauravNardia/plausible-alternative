"use client"

import { useEffect, useState } from "react"
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts"
import { CustomTooltip } from "./Tooltip"
import { Metric } from "./Metrics"
import { formatNumber } from "@/lib/utils"

interface ChartData {
  label: string
  count: number
}

interface MetricsData {
  uniqueVisitors: number
  totalVisits: number
  totalPageviews: number
  viewsPerVisit: string
}

function getDaysInRange(filter: string): string[] {
  const now  = new Date()
  const days: string[] = []
  const fmt  = (d: Date) => d.toISOString().slice(0, 10)

  const addDays = (count: number) => {
    for (let i = 0; i < count; i++) {
      const d = new Date(now)
      d.setDate(d.getDate() - (count - 1 - i))
      days.push(fmt(d))
    }
  }

  switch (filter) {
    case "7d":   addDays(7);   break
    case "30d":  addDays(30);  break
    case "180d": addDays(180); break
    case "365d": addDays(365); break
    default: return [] // today/yesterday → hourly mode, no date array needed
  }

  return days
}

export const DashboardChart = ({
  siteId,
  filter,
  timezone,
}: {
  siteId: string
  filter: string
  timezone: string
}) => {
  const [data,    setData]    = useState<ChartData[]>([])
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Re-fetch whenever filter or timezone changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const tz = encodeURIComponent(timezone)

        const [chartRes, metricsRes] = await Promise.all([
          fetch(`/api/sites/analytics?siteId=${siteId}&filter=${filter}&tz=${tz}`),
          fetch(`/api/sites/metrics?siteId=${siteId}&filter=${filter}&tz=${tz}`),
        ])

        const json = await chartRes.json()
        const metricsJson = await metricsRes.json()
        setMetrics(metricsJson)

        const hourly: boolean = json.hourly

        if (hourly) {
          // today / yesterday → fill all 24 hours, zero for missing
          const hours = Array.from({ length: 24 }, (_, i) =>
            i.toString().padStart(2, "0") + ":00"
          )
          setData(hours.map(hour => {
            const found = json.data.find((d: any) => d.label === hour)
            return { label: hour, count: found ? Number(found.count) : 0 }
          }))
        } else {
          // fill every date in range with 0 if missing
          const days = getDaysInRange(filter)
          setData(days.map(date => {
            const found = json.data.find((d: any) => d.label === date)
            return { label: date, count: found ? Number(found.count) : 0 }
          }))
        }
      } catch (err) {
        console.error("Chart fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [siteId, filter, timezone])

  // Space out X axis labels so they don't overlap on long ranges
  const xAxisInterval =
    data.length > 120 ? Math.floor(data.length / 8) :
    data.length > 30  ? Math.floor(data.length / 10) :
    isMobile ? 3 : 2

  return (
    <div className="w-full">
      {/* Metric boxes — update with filter */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        <Metric title="Unique Visitors" value={metrics ? formatNumber(metrics.uniqueVisitors) : "—"} />
        <Metric title="Total Visits"    value={metrics ? formatNumber(metrics.totalVisits)    : "—"} />
        <Metric title="Total Pageviews" value={metrics ? formatNumber(metrics.totalPageviews) : "—"} />
        <Metric title="Views per Visit" value={metrics ? metrics.viewsPerVisit                : "—"} />
      </div>

      <div className="dot-bg h-[80px] border-b" />

      {/* Chart area */}
      <div className="w-full h-[300px] md:h-[450px] border-b py-5 bg-neutral-100">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="20%"  stopColor="#5851ed" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#5851ed" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E2E2E2" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#94a3b8"
                interval={xAxisInterval}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                domain={[0, (dataMax: number) => dataMax + 1]}
              />
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
        )}
      </div>
    </div>
  )
}
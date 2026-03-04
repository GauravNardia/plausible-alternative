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
import { formatNumber } from "@/lib/utils"
import { Metric } from "../charts/Metrics"
import { CustomTooltip } from "../charts/Tooltip"

interface ChartData {
  hour: string
  count: number
}

export const LandingAnalyticsDemo = () => {
  const [data, setData] = useState<ChartData[]>([])
  const [metrics, setMetrics] = useState({
    uniqueVisitors: 12458,
    totalVisits: 18221,
    totalPageviews: 32914,
    viewsPerVisit: 1.8,
  })
  const [isMobile, setIsMobile] = useState(false)

  // responsive ticks
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // generate initial fake data
  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) =>
      i.toString().padStart(2, "0") + ":00"
    )

    const generated = hours.map((hour, i) => {
      const base = 30 + Math.sin(i / 3) * 50
      const random = Math.floor(Math.random() * 20)

      return {
        hour,
        count: Math.floor(base + random),
      }
    })

    setData(generated)
  }, [])

  // simulate live traffic
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev =>
        prev.map((d, i) => {
          if (i === prev.length - 1) {
            return {
              ...d,
              count: Math.max(5, d.count + Math.floor(Math.random() * 6 - 3)),
            }
          }

          return {
            ...d,
            count: Math.max(5, d.count + Math.floor(Math.random() * 4 - 2)),
          }
        })
      )

      setMetrics(prev => ({
        ...prev,
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 4),
        totalVisits: prev.totalVisits + Math.floor(Math.random() * 5),
        totalPageviews: prev.totalPageviews + Math.floor(Math.random() * 8),
      }))
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-white">

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
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

      <div className="dot-bg h-[70px] border-b" />

      {/* Chart */}
      <div className="w-full h-[320px] md:h-[450px] py-5 bg-neutral-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <defs>
              <linearGradient id="landingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#5851ed" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#5851ed" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#E5E7EB" vertical={false} />

            <XAxis
              dataKey="hour"
              stroke="#94a3b8"
              interval={isMobile ? 3 : 2}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />

            <Tooltip cursor={false} content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#5851ed"
              strokeWidth={2}
              fill="url(#landingGradient)"
              dot={false}
              isAnimationActive
              animationDuration={800}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
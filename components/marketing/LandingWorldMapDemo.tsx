"use client"

import React, { useEffect, useMemo, useState } from "react"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts/core"
import { MapChart } from "echarts/charts"
import { TooltipComponent, VisualMapComponent } from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"
import countriesLib from "i18n-iso-countries"
import en from "i18n-iso-countries/langs/en.json"

countriesLib.registerLocale(en)

echarts.use([MapChart, TooltipComponent, VisualMapComponent, CanvasRenderer])

type Item = {
  name: string
  visitors: number
}

export default function WorldMap() {
  const [mapReady, setMapReady] = useState(false)

  const [countries] = useState<Item[]>([
    { name: "US", visitors: 120 },
    { name: "IN", visitors: 95 },
    { name: "DE", visitors: 40 },
    { name: "GB", visitors: 55 },
    { name: "FR", visitors: 35 },
    { name: "CA", visitors: 30 },
    { name: "BR", visitors: 28 },
    { name: "AU", visitors: 22 },
  ])

  useEffect(() => {
    // Dynamically import to avoid SSR/Turbopack issues with JSON parsing
    Promise.all([
      import("topojson-client"),
      import("world-atlas/countries-110m.json"),
    ]).then(([topojson, worldData]) => {
      const data = worldData.default ?? worldData
      const geo = topojson.feature(
        data as any,
        (data as any).objects.countries
      )
      echarts.registerMap("world", geo as any)
      setMapReady(true)
    })
  }, [])

  const formattedData = useMemo(() => {
    return countries.map((c) => {
      const fullName = countriesLib.getName(c.name, "en")
      return { name: fullName || c.name, value: c.visitors }
    })
  }, [countries])

  const maxValue = useMemo(
    () => Math.max(...countries.map((c) => c.visitors), 1),
    [countries]
  )

  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#ffffff",
      borderColor: "#E5E7EB",
      textStyle: { color: "#000000" },
      formatter: (params: any) => {
        const value = params.value
        if (!value) return `<strong>${params.name}</strong><br/>No data`
        return `<strong>${params.name}</strong><br/>${value} visitors`
      },
    },
    visualMap: {
      min: 0,
      max: maxValue,
      show: false,
      inRange: { color: ["#c7d2fe", "#4f46e5"] },
    },
    series: [
      {
        type: "map",
        map: "world",
        roam: false,
        itemStyle: {
          areaColor: "#f3f4f6",
          borderColor: "#d1d5db",
          borderWidth: 0.5,
        },
        emphasis: {
          itemStyle: { areaColor: "#5851ed" },
          label: { show: false },
        },
        data: formattedData,
      },
    ],
  }

  if (!mapReady) {
    return (
      <div className="w-full bg-neutral-100 border-b h-[420px] rounded-xl overflow-hidden flex items-center justify-center">
        <span className="text-sm text-neutral-400">Loading map...</span>
      </div>
    )
  }

  return (
    <div className="w-full bg-neutral-100 border-y h-[420px] overflow-hidden">
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  )
}
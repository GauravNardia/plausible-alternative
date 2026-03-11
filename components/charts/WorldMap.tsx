"use client"

import { useEffect, useMemo } from "react"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts/core"
import { MapChart } from "echarts/charts"
import { TooltipComponent } from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"

import * as topojson from "topojson-client"
import world from "world-atlas/countries-110m.json"

import countriesLib from "i18n-iso-countries"
import en from "i18n-iso-countries/langs/en.json"

countriesLib.registerLocale(en)

echarts.use([
  MapChart,
  TooltipComponent,
  CanvasRenderer
])

type Item = {
  name: string // ISO2 (IN, US)
  visitors: number
}

export default function WorldMap({ countries }: { countries: Item[] }) {

  useEffect(() => {
    const geo = topojson.feature(
      world as any,
      (world as any).objects.countries
    )
    echarts.registerMap("world", geo as any)
  }, [])

  // 🔥 Convert ISO2 → Full country name
  const formattedData = useMemo(() => {
    return countries.map((c) => {
      const fullName = countriesLib.getName(
        c.name,
        "en"
      )

      return {
        name: fullName || c.name,
        value: c.visitors
      }
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
        const value = params.value || 0
        return `<strong>${params.name}</strong><br/>${value} visitors`
      }
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
          borderWidth: 0.5
        },

        emphasis: {
          itemStyle: {
            areaColor: "#5851ed"
          },
          label: {
            show: false
          }
        },

        data: formattedData
      }
    ]
  }

  return (
<div className="w-full bg-neutral-100 border-b h-[420px]">     
  <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  )
}
"use client"

import { useState, useMemo } from "react"
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps"

import world from "world-atlas/countries-110m.json"

import countriesLib from "i18n-iso-countries"
import en from "i18n-iso-countries/langs/en.json"

countriesLib.registerLocale(en)

type Item = {
  name: string // ISO_A2 (IN, US, DE)
  visitors: number | string
}

export default function WorldMap({ countries }: { countries: Item[] }) {
  const [tooltip, setTooltip] = useState<{
    x: number
    y: number
    name: string
    value: number
  } | null>(null)

  // Normalize backend data
  const countryMap = useMemo(() => {
    const map: Record<string, number> = {}

    countries.forEach((c) => {
      if (!c.name) return
      map[c.name.toUpperCase()] = Number(c.visitors) || 0
    })

    return map
  }, [countries])

  const max = useMemo(() => {
    const values = Object.values(countryMap)
    return values.length ? Math.max(...values) : 1
  }, [countryMap])

  return (
    <div className="relative mt-6 w-full">

      <ComposableMap projectionConfig={{ scale: 150 }}>
        <Geographies geography={world}>
          {({ geographies }: any) =>
            geographies.map((geo: any) => {
              const numericId = geo.id

              // 🔥 Convert numeric ISO → ISO_A2
              const iso2 = countriesLib.numericToAlpha2(numericId)

              const visitors = iso2
                ? countryMap[iso2] || 0
                : 0

              const intensity = visitors / max

            //   const fillColor =
            //     visitors === 0
            //       ? "#f3f4f6"
            //       : `rgba(0,0,0,${0.2 + intensity * 0.6})`
            const fillColor = "#f3f4f6"

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#e5e7eb"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#111", outline: "none" },
                    pressed: { outline: "none" }
                  }}
                  onMouseEnter={(e: any) => {
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      name: geo.properties.name,
                      value: visitors
                    })
                  }}
                  onMouseMove={(e: any) => {
                    setTooltip((prev) =>
                      prev
                        ? { ...prev, x: e.clientX, y: e.clientY }
                        : null
                    )
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-black text-white text-sm px-3 py-2 rounded-md shadow-lg pointer-events-none"
          style={{
            top: tooltip.y + 12,
            left: tooltip.x + 12
          }}
        >
          <div className="font-medium">{tooltip.name}</div>
          <div className="text-xs opacity-80">
            {tooltip.value} visitors
          </div>
        </div>
      )}
    </div>
  )
}
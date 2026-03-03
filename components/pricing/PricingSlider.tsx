"use client"

import { TIERS } from "@/constants"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Image from "next/image"

export default function PricingSlider() {
  const [index, setIndex] = useState(0)
  const tier = TIERS[index]

  return (
    <div className="bg-neutral-100 overflow-hidden">

      {/* Slider Section */}
      <div className="bg-[#ffffff] px-6 py-8 border-b border-gray-200 border-t">
        <p className="text-center text-semibold text-neutral-600 mb-6">
          How many pageviews do you track per month?
        </p>

        <div className="flex justify-between text-xs text-neutral-600 mb-2">
          {TIERS.map((t, i) => (
            <span key={i}>{t.label}</span>
          ))}
        </div>

        <Input
          type="range"
          min={0}
          max={TIERS.length - 1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="w-full bg-[#5851ed] shadow-none cursor-grab "
        />
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3">

        {/* Starter */}
        <Plan
          name="Starter"
          price={tier.starter}
          sites="1 site"
          views={tier.views}
        />

        {/* Growth */}
        <Plan
          name="Growth"
          price={tier.growth}
          sites="Up to 3 sites"
          views={tier.views}
          highlight
        />

        {/* Scale */}
        <Plan
          name="Scale"
          price={tier.scale}
          sites="Up to 10 sites"
          views={tier.views}
        />

      </div>

      {/* Bottom */}
    <div className="dot-bg h-[60px] sm:h-[80px] border-b" />
    </div>
  )
}

function Plan({
  name,
  price,
  sites,
  views,
  highlight,
}: {
  name: string
  price: number
  sites: string
  views: string
  highlight?: boolean
}) {
  return (
    <div
      className={`border-r border-gray-200 last:border-none
      ${highlight ? "bg-[#6d5efc]" : "bg-[#ffffff]"}
      ${highlight ? "text-white" : "text-black"}
      `}
    >

      <div className="font-regular flex justify-start items-center bg-neutral-100 h-[200px] px-5 border-b">
       <span className="text-5xl text-black">${price}</span>
       <div className="flex flex-col justify-start items-start text-left">
         <span className="text-sm ml-2 text-black font-semibold uppercase ">{name}</span>
          <span className="text-sm ml-2 text-black">{views} views/month</span>
       </div>
      </div>

      <Button
        className={` w-full py-6 font-semibold transition cursor-pointer rounded-none
        ${
          highlight
            ? "bg-[#5851ed] hover:bg-[#4e47cd] text-white"
            : "bg-white hover:bg-neutral-100 text-black"
        }`}
      >
        GET STARTED
      </Button>

      <ul className="h-[250px] border-y border-gray-200 space-y-3 text-md text-left text-black bg-neutral-100 px-5 py-10">
         <li className="flex items-center gap-3">
         <Image
           src="/assets/icons/check.svg"
           alt="Check icon"
           width={20}
           height={20}
           className="shrink-0 blue rounded-full p-1"
         />
         <span>{sites}</span>
         </li>
         <li className="flex items-center gap-3">
         <Image
           src="/assets/icons/check.svg"
           alt="Check icon"
           width={20}
           height={20}
           className="shrink-0 blue rounded-full p-1"
         />
         <span>Geo analytics</span>
         </li>
         <li className="flex items-center gap-3">
         <Image
           src="/assets/icons/check.svg"
           alt="Check icon"
           width={20}
           height={20}
           className="shrink-0 blue rounded-full p-1"
         />
         <span>Devices & Sources</span>
         </li>
         <li className="flex items-center gap-3">
         <Image
           src="/assets/icons/check.svg"
           alt="Check icon"
           width={20}
           height={20}
           className="shrink-0 blue rounded-full p-1"
         />
         <span>Custom events</span>
         </li>      </ul>
    </div>
  )
}
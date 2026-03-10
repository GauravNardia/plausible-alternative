"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Image from "next/image"
import { PLAN_PRODUCT_IDS, TIERS } from "@/constants"

export default function PricingSlider({ userEmail, isLoggedIn }: { userEmail: string; isLoggedIn: boolean }) {
  const [index, setIndex] = useState(0)
  const tier = TIERS[index]

  return (
    <div className="bg-neutral-100 overflow-hidden">
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
          className="w-full accent-[#5851ed] hover:accent-[#3830cc] shadow-none cursor-grab"
        />
      </div>

      <div className="grid md:grid-cols-3">
       <Plan name="Starter" price={tier.starter} sites="1 site" views={tier.views} tierIndex={index} userEmail={userEmail} isLoggedIn={isLoggedIn} />
       <Plan name="Growth"  price={tier.growth}  sites="Up to 3 sites" views={tier.views} tierIndex={index} userEmail={userEmail} isLoggedIn={isLoggedIn} highlight  />
       <Plan name="Scale"   price={tier.scale}   sites="Up to 10 sites" views={tier.views} tierIndex={index} userEmail={userEmail} isLoggedIn={isLoggedIn} />
      </div>

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
  userEmail,
  tierIndex,    
  isLoggedIn
}: {
  name: string
  price: number
  sites: string
  views: string
  highlight?: boolean
  userEmail: string
  tierIndex: number
  isLoggedIn: boolean

}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)

        // Redirect to sign-in if not logged in
    if (!isLoggedIn) {
      window.location.href = "/sign-in"
      return
    }

        // THIS IS THE FIX — use name + tierIndex to get correct product
    const key = `${name.toLowerCase()}_${tierIndex}`
    const productId = PLAN_PRODUCT_IDS[key]

    if (!productId) {
      setError("Plan not available")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          product_cart: [
            {
              product_id: productId,
              quantity: 1,
            },
          ],

          customer_email: userEmail,

          metadata: {
            userId: userEmail,
            plan: name.toLowerCase(),
            views: views,
          },

          return_url:
            process.env.NEXT_PUBLIC_RETURN_URL ??
            window.location.origin + "/sites",
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message ?? "Checkout failed")
        return
      }

      if (!data.url) {
        setError("Checkout URL missing")
        return
      }

      // redirect to Dodo checkout
      window.location.href = data.url

    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`border-r border-gray-200 last:border-none
        ${highlight ? "bg-[#6d5efc] text-white" : "bg-[#ffffff] text-black"}`}
    >
      <div className="font-regular flex justify-start items-center bg-neutral-100 h-[200px] px-5 border-b">
        <span className="text-5xl text-black">${price}</span>
        <div className="flex flex-col justify-start items-start text-left">
          <span className="text-sm ml-2 text-black font-semibold uppercase">{name}</span>
          <span className="text-sm ml-2 text-black">{views} views/month</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-6 flex justify-between text-left font-semibold transition cursor-pointer rounded-none
          ${highlight
            ? "bg-[#5851ed] hover:bg-[#4e47cd] text-white"
            : "bg-white hover:bg-neutral-100 text-black"
          }`}
      >
        {loading ? "LOADING..." : "GET STARTED"}
        <Image
        src={`${highlight ? "/assets/icons/arrow-white.svg": "/assets/icons/arrow-black.svg"}`}
        alt="arrow"
        width={25}
        height={25}
        />
      </Button>

      {error && (
        <p className="text-red-500 text-xs text-center px-4 py-2 bg-red-50">
          {error}
        </p>
      )}

      <ul className="h-[250px] border-y border-gray-200 space-y-3 text-md text-left text-black bg-neutral-50 px-5 py-10">
        {[sites, "Geo analytics", "Devices & Sources", "Custom events"].map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Image
              src="/assets/icons/check.svg"
              alt="Check icon"
              width={20}
              height={20}
              className="shrink-0 blue rounded-full p-1"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
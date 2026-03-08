"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { LandingAnalyticsDemo } from "./LandingAnalyticsDemo"
import WaitlistForm from "../forms/WaitlistForm"

export const Hero = () => {
  const router = useRouter()
  return (
    <section className="w-full mx-auto sm:pt-24 flex flex-col justify-center">      
    <div  id="early-access" className="w-full text-left px-5 sm:px-6 py-13">
      <h1 className="text-3xl md:text-5xl font-semibold leading-tight font-bpmf">
       <span className="block">
        Simple. Privacy-First Analytics.
      </span>
      <span className="block">
        Built for Builders.
      </span>
      </h1>
        <p className="mt-3 text-md text-neutral-500">
          Understand your traffic without spying on your users.
          No cookies. No trackers. No creepy dashboards.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <WaitlistForm />
          {/* <Button onClick={() => router.push("/sites")} className="primary-border blue rounded-xl text-white px-6 cursor-pointer shadow-md font-semibold">
            START TRACKING
          </Button>
          <Button onClick={() => router.push("/pricing")} className="secondary-border white rounded-xl text-black px-6 cursor-pointer shadow-md font-semibold">
            VIEW PRICING
          </Button> */}
        </div>
      </div>

      <div className="w-full sm:mt-16">
        <LandingAnalyticsDemo />
      </div>
    </section>
  )
}
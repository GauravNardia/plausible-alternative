"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const Hero = () => {
  const router = useRouter()
  return (
    <section className="w-full mx-auto px-5 sm:px-6 py-24 flex justify-center">      
    <div className="w-full text-left sm:px-5">
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
          <Button onClick={() => router.push("/dashboard")} className="primary-border blue rounded-xl text-white px-6 cursor-pointer shadow-md font-semibold">
            START TRACKING
          </Button>
          <Button onClick={() => router.push("/demo")} className="secondary-border white rounded-xl text-black px-6 cursor-pointer shadow-md font-semibold">
            VIEW LIVE DEMO
          </Button>
        </div>
      </div>
{/* 
      <div className="bg-gray-100 rounded-md h-[400px] flex items-center justify-center text-gray-400">
        Dashboard Preview
      </div> */}
    </section>
  )
}
"use client"

import { formatNumber } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

type Props = {
  usage: any
  sitesUsed: number
}

export default function BillingCard({ usage, sitesUsed }: Props) {
  const router = useRouter();
  const percentage = Math.min(Math.round((usage.used / usage.limit) * 100),100)

  return (
    <>
                <div className="w-full max-w-5xl mx-auto bg-neutral-100 border border-gray-200 rounded-2xl mt-10">
                  {/* Top Section */}
                  <div className="flex flex-col bg-[#ffffff] rounded-2xl px-3 py-5">
                    <div className="px-3">
                      <p className="text-sm uppercase font-semibold blue-text">Current plan</p>
                    </div>

                  <div className="w-full flex items-start justify-between mt-3">
                  <div className="w-full flex justify-between items-center gap-6 py-2 px-5 font-semibold text-neutral-600">
                    <div>
                      <p className="text-sm uppercase tracking-wide">
                        Plan
                      </p>
                      <p className="text-sm font-semibold text-black mt-1">
                       {usage.planName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm uppercase tracking-wide">
                        Events
                      </p>
                      <p className="text-sm font-semibold text-black mt-1">
                       {formatNumber(usage.used)}/{formatNumber(usage.limit)}
                      </p>
                    </div>
      
                    <div>
                      <p className="text-sm uppercase tracking-wide">
                        Sites
                      </p>
                      <p className="text-sm font-semibold text-black mt-1">
                       {sitesUsed}/{usage.maxsites}
                      </p>
                    </div>
                  </div>
                  </div>

                  </div>
      
                  {/* Stats Grid */}
                  <div className="w-full flex justify-between items-center gap-6 pt-5 px-5 font-semibold text-neutral-400">
                    <p className="text-sm font-semibold text-neutral-600">
                      Usage resets at the beginning of each billing cycle
                    </p>
                    <Button 
                    onClick={() => router.push('/pricing')}
                    className="text-sm uppercase cursor-pointer font-semibold px-5 blue primary-border text-white rounded-xl hover:opacity-90 transition">
                      Upgrade plan
                    </Button>
                  </div>
                  <div className="mx-5 text-sm text-orange-600">
  You're close to your monthly event limit.
</div>
                </div>

      {/* <div className="w-full bg-white border-y border-neutral-200 p-8 mb-8">

            <div className="w-full bg-neutral-200 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  percentage >= 100
                    ? "bg-red-600"
                    : percentage >= 90
                    ? "bg-orange-500"
                    : percentage >= 70
                    ? "bg-yellow-500"
                    : "bg-purple-600"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {percentage >= 100 && (
              <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 font-medium">
                  Event limit reached
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Tracking has been paused for this month. Upgrade your plan to continue collecting events.
                </p>
              </div>
            )}

            {percentage >= 90 && percentage < 100 && (
              <div className="mt-5 p-3 rounded-lg bg-orange-50 border border-orange-200">
                <p className="text-sm text-orange-700 font-medium">
                  Approaching limit
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  You're close to your monthly event limit. Consider upgrading to avoid interruption.
                </p>
              </div>
            )}

            {percentage >= 70 && percentage < 90 && (
              <div className="mt-5 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-700 font-medium">
                  High usage
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  You've used most of your events for this month.
                </p>
              </div>
            )}

          </div>
        </div>
*/}



    </>
  )
}
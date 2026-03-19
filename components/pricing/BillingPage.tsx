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
  const router = useRouter()
    // No subscription yet
  if (!usage || usage.hasSubscription === false) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-neutral-100  mt-10">
        <div className="flex flex-col bg-[#ffffff] justify-center items-center rounded-2xl px-3 py-5">
          <div>
            <Image
            src="/assets/icons/sub-illustration.jpg"
            width={150}
            height={150}
            className="select-none"
            alt="sub"
            />
          </div>
          <div className="px-3 py-4 text-center">
            <p className="text-sm uppercase font-semibold text-neutral-400 mb-3">
              No active subscription
            </p>
            <p className="text-neutral-600 text-sm mb-5">
              You don't have an active plan yet.
            </p>
            <Button
              onClick={() => router.push("/pricing")}
              className="text-sm uppercase cursor-pointer font-semibold px-5 blue primary-border text-white rounded-xl hover:opacity-90 transition"
            >
              View plans
            </Button>
          </div>
        </div>
      </div>
    )
  }
  const percentage = Math.min(Math.round((usage.used / usage.limit) * 100), 100)

  return (
    <>
      <div className="w-full max-w-5xl mx-auto bg-neutral-100 border border-gray-200 rounded-2xl mt-10">
        {/* Top Section */}
        <div className="flex flex-col bg-[#ffffff] rounded-2xl px-3 py-5">
          <div className="px-3">
            <p className="text-sm uppercase font-semibold blue-text">
              Current plan
            </p>
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

                {percentage >= 100 && (
                  <p className="flex gap-1 items-center text-xs danger-text mt-1">
                    <Image
                      src="/assets/icons/alert-circle.svg"
                      width={15}
                      height={15}
                      alt="alrt"
                    />
                    Event limit reached. Upgrade to continue tracking.
                  </p>
                )}

                {percentage >= 90 && percentage < 100 && (
                  <p className="flex gap-1 items-center text-xs text-regular alert-text mt-1">
                    <Image
                      src="/assets/icons/alert-triangle.svg"
                      width={15}
                      height={15}
                      alt="alrt"
                    />
                    Near your monthly event limit.
                  </p>
                )}

                {percentage >= 70 && percentage < 90 && (
                  <p className="flex gap-1 items-center text-xs warning-text mt-1">
                    <Image
                      src="/assets/icons/activity.svg"
                      width={15}
                      height={15}
                      alt="alrt"
                    />
                    Most events used this cycle.
                  </p>
                )}
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
        <div className="w-full flex justify-between items-center gap-6 py-5 px-5 font-semibold text-neutral-400">
          <p className="text-sm font-semibold text-neutral-600">
            Resets every billing cycle
          </p>

          <Button
            onClick={() => router.push("/pricing")}
            className="text-sm uppercase cursor-pointer font-semibold px-5 blue primary-border text-white rounded-xl hover:opacity-90 transition"
          >
            Upgrade plan
          </Button>
        </div>
      </div>
    </>
  )
}
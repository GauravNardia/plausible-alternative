"use client"

import Image from 'next/image'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { X } from 'lucide-react'

interface Props {
  status: string
  trialEndsAt: string | null
}

const TrialBanner = ({ status, trialEndsAt }: Props) => {
  const router = useRouter()
  const [dismissed, setDismissed] = useState(false)

  if (status !== "trialing") return null
  if (!trialEndsAt) return null
  if (dismissed) return null

  const daysLeft = Math.ceil(
    (new Date(trialEndsAt).getTime() - Date.now()) / 86400000
  )

  if (daysLeft <= 0) return null

  const isUrgent = daysLeft <= 1
  const isWarning = daysLeft <= 3

  const config = {
    wrapper: isUrgent
      ? 'bg-red-50 border-red-200'
      : isWarning
      ? 'bg-orange-50 border-orange-200'
      : 'bg-yellow-50 border-yellow-200',
    icon: isUrgent
      ? "/assets/icons/alert-circle.svg"
      : isWarning
      ? "/assets/icons/alert-triangle.svg"
      : "/assets/icons/activity.svg",
    title: isUrgent
      ? 'Last day of your trial'
      : isWarning
      ? 'Trial ending soon'
      : 'Free trial active',
    titleColor: isUrgent
      ? 'text-red-700'
      : isWarning
      ? 'text-orange-700'
      : 'text-yellow-700',
    message: isUrgent
      ? "Your free trial ends today. Upgrade now to keep tracking your visitors."
      : isWarning
      ? `${daysLeft} days left on your free trial. Upgrade soon to avoid interruption.`
      : `${daysLeft} days left on your free trial. Upgrade anytime to continue tracking.`,
    messageColor: isUrgent
      ? 'text-red-600'
      : isWarning
      ? 'text-orange-600'
      : 'text-yellow-600',
    buttonClass: isUrgent
      ? 'red red-border hover:!bg-red-600'
      : isWarning
      ? '!bg-orange-500 !border !border-orange-600 hover:!bg-orange-600'
      : '!bg-yellow-500 !border !border-yellow-600 hover:!bg-yellow-600'
  }

  return (
    <div className={`mx-0 border p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${config.wrapper}`}>
      <div>
        <div className='flex items-center gap-1'>
          <Image
            src={config.icon}
            width={18}
            height={18}
            alt='trial status icon'
          />
          <p className={`text-sm font-semibold ${config.titleColor}`}>
            {config.title}
          </p>
        </div>
        <p className={`text-sm mt-1 ${config.messageColor}`}>
          {config.message}
        </p>
      </div>

      <div className='flex gap-3 items-center'>
        <Button
          onClick={() => router.push('/pricing')}
          className={`px-4 py-2 text-white text-sm uppercase rounded-xl cursor-pointer shadow-sm transition hover:opacity-90 shrink-0 ${config.buttonClass}`}
        >
          Upgrade Plan
        </Button>

        {!isUrgent && (
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-black/5 transition"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default TrialBanner
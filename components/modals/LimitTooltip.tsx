"use client"
import Image from 'next/image';
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { X } from 'lucide-react';

const LimitTooltip = ({ usage }: any) => {
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false)

  if (usage < 70) return null;
  if (dismissed) return null;
  
  const isWarning = usage >= 70 && usage < 90;
  const isDanger = usage >= 90 && usage < 100;
  const isBlocked = usage >= 100;

  const config = {
    wrapper: isBlocked
      ? 'bg-red-50 border-red-200'
      : isDanger
      ? 'bg-orange-50 border-orange-200'
      : 'bg-yellow-50 border-yellow-200',
    icon: isBlocked
      ? "/assets/icons/alert-circle.svg"
      : isDanger
      ? "/assets/icons/alert-triangle.svg"
      : "/assets/icons/activity.svg",
    title: isBlocked
      ? 'Tracking paused'
      : isDanger
      ? 'Approaching limit'
      : 'Heads up',
    titleColor: isBlocked
      ? 'text-red-700'
      : isDanger
      ? 'text-orange-700'
      : 'text-yellow-700',
    message: isBlocked
      ? "You've reached your monthly event limit. Upgrade your plan to resume analytics."
      : isDanger
      ? `You've used ${usage}% of your monthly events. Upgrade soon to avoid interruption.`
      : `You've used ${usage}% of your monthly events. Consider upgrading your plan.`,
    messageColor: isBlocked
      ? 'text-red-600'
      : isDanger
      ? 'text-orange-600'
      : 'text-yellow-600',
    buttonClass: isBlocked
      ? 'red red-border hover:!bg-red-600'  
      : isDanger
      ? '!bg-orange-500 !border !border-orange-600 hover:!bg-orange-600'      
      : 'bg-yellow-500 !border !border-yellow-600 hover:!bg-yellow-600'      
  }

  return (
    <div className={`mx-4 md:mx-0 border p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${config.wrapper}`}>
      <div>
        <div className='flex items-center gap-1'>
          <Image
          src={config.icon}
          width={18}
          height={18}
          alt='icons'
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

      {!isBlocked && (
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

export default LimitTooltip
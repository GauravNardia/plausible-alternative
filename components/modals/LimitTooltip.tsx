"use client"
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const LimitTooltip = ({ usage }: any) => {
    const router = useRouter();
  return (
    <>
  {usage >= 100 && ( 
  <div className="mx-4 md:mx-0 bg-red-50 border border-red-200 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div>
      <p className="text-sm font-semibold text-red-700">
        🔴 Tracking paused
      </p>
      <p className="text-sm text-red-600 mt-1">
        You've reached your monthly event limit. Upgrade your plan to resume analytics.
      </p>
    </div>

    <Button
      onClick={() => router.push('/pricing')}
      className="px-4 py-2 red red-border text-white text-sm rounded-xl cursor-pointer hover:bg-red-700 shadow-sm transition"
    >
      Upgrade Plan
    </Button>
  </div>
 
)}
    
    </>
  )
}

export default LimitTooltip
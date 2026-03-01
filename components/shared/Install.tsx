"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface InstallBoxProps {
  script: string
  siteId: string
}

export default function InstallBox({ script, siteId }: InstallBoxProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  useEffect(() => {
  const interval = setInterval(async () => {
    const res = await fetch(`/api/sites/status?siteId=${siteId}`)
    const data = await res.json()

    if (data.hasEvents) {
      clearInterval(interval)
      router.push(`/dashboard/${siteId}`)
    }
  }, 3000)

  return () => clearInterval(interval)
}, [siteId])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="font-inter sm:w-[800px] mx-auto flex items-center justify-center w-full">
      <div className="w-full bg-neutral-100 rounded-xl px-8 py-8">

        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src="/assets/images/logo2.png"
            alt="logo"
            width={60}
            height={60}
            className="mb-3"
          />

          <h2 className="text-sm font-semibold text-black">
            Plant Puffin on your website 🌱
          </h2>

          <p className="text-sm text-black mt-1">
            Copy the script below and paste it before body on your site.
          </p>
        </div>

        <div className="relative bg-neutral-200 rounded-2xl p-6 text-sm text-black">
          <pre className="overflow-x-auto whitespace-pre-wrap break-all">
            {script}
          </pre>

          <button
            onClick={copyToClipboard}
            className="absolute top-4 right-4 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-lg transition"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
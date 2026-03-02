"use client"

import { useEffect, useState } from "react"
import { Check, Copy, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "../ui/button"

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
      router.push(`/dashboard`)
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
  <div className="min-h-screen flex items-center justify-center px-6">
    <div className="w-full max-w-2xl bg-neutral-100 rounded-3xl p-10">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-neutral-100 p-4 rounded-2xl mb-4">
          <Image
            src="/assets/images/logo2.png"
            alt="logo"
            width={44}
            height={44}
          />
        </div>

        <h2 className="text-xl font-semibold text-neutral-900">
          Install Puffin on your website 🌱
        </h2>

        <p className="text-neutral-500 text-sm mt-2 max-w-md">
          Add this script to your website to start tracking visitors.
        </p>
      </div>

      {/* Step 1 */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-black mb-3">
          Step 1 — Copy this script
        </p>

        <div className="relative">
      <SyntaxHighlighter
        language="html"
        style={oneDark}
        showLineNumbers={false}
        wrapLongLines
        customStyle={{
          borderRadius: "20px",
          padding: "28px",
          fontSize: "13px",
          margin: 0,
          background: "#0f172a",
        }}
        codeTagProps={{
          style: {
            fontFamily: "JetBrains Mono, monospace",
          },
        }}
      >
        {script}
      </SyntaxHighlighter>

          <Button
            variant="secondary"
            onClick={copyToClipboard}
            className="absolute top-3 right-3 h-8 px-3 text-xs bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20"
          >
            {copied ? (
              <>
                <Check size={14} className="mr-1" />
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-8">
        <p className="text-sm  font-semibold text-black mb-2">
          Step 2 — Paste it before
          <span className="mx-1 font-mono text-neutral-900 bg-[#addb37] px-2 py-1 rounded-md text-xs">
            {"</body>"}
          </span>
          in your HTML
        </p>

        <p className="text-xs text-neutral-800">
          After adding the script, refresh your website and we'll automatically detect your first event.
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 text-sm text-black border-t pt-6">
        <Loader2 className="animate-spin" size={16} />
        Waiting for first event...
      </div>

    </div>
  </div>
)
}
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
  domain: string
  siteId: string
}

export default function InstallBox({ script, siteId, domain }: InstallBoxProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  useEffect(() => {
  const interval = setInterval(async () => {
    const res = await fetch(`/api/sites/status?siteId=${siteId}`)
    const data = await res.json()
    console.log("STATUS:", data)

    if (data.hasEvents) {
      clearInterval(interval)
           console.log("REDIRECTING TO:", `/${domain}`) 
      router.push(`/${domain}`)
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
  <div className="min-h-screen flex items-start justify-center">
    <div className="w-full border-b border-gray-200">

      {/* Header */}
      <div className="flex flex-col items-center text-center bg-[#ffffff] py-4">
        <div className="py-2 rounded-full mb-4">
          <Image
            src="/assets/images/logo2.jpg"
            alt="logo"
            width={44}
            height={44}
          />
        </div>

        <h2 className="text-xl font-semibold text-black font-bpmf">
          Install Puffin on your website
        </h2>

        <p className="text-neutral-600 text-md mt-1 max-w-md ">
          Add this script to your website to start tracking visitors.
        </p>
      </div>

      {/* Step 1 */}
      <div className="py-10 px-5 border-t">
        <p className="text-sm font-semibold text-black mb-3 font-bpmf">
          Step 1 — Copy this script
        </p>

        <div className="relative w-full">
      <SyntaxHighlighter
        language="html"
        style={oneDark}
        showLineNumbers={false}
        wrapLongLines
        customStyle={{
          borderRadius: "10px",
          padding: "28px",
          fontSize: "13px",
          margin: 0,
          background: "#0f172a",
          width: "100%"
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

      <div className="h-[60px] dot-bg border-y" />


      {/* Step 2 */}
      <div className="py-10 px-5">
        <p className="text-sm  font-semibold text-black mb-2 font-bpmf">
          Step 2 — Paste it before
          <span className="mx-1 font-mono text-white bg-[#5851ed] px-2 py-1 rounded-md text-xs">
            {"</body>"}
          </span>
          in your HTML
        </p>

        <p className="text-xs text-neutral-800">
          After adding the script, refresh your website and we'll automatically detect your first event.
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 text-sm text-black border-t pt-6 pb-5">
        <Loader2 className="animate-spin" size={16} />
        Waiting for first event...
      </div>

    </div>
  </div>
)
}
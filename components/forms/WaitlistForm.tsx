"use client"

import { useState } from "react"
import { joinWaitlist } from "@/lib/actions/waitlist.action"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    if (!email) return

    setStatus("loading")

    const result = await joinWaitlist(email)

    if (result.success) {
      setStatus("success")
      setEmail("")
    } else {
      setStatus("error")
      setMessage(result.error ?? "Something went wrong.")
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md flex items-center justify-center text-center py-2 px-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
        🎉 You're on the list! Check your email.
      </div>
    )
  }

  return (
    <section className="w-full max-w-lg flex flex-col justify-start items-center">
      
      <div className=" w-full flex flex-col sm:flex-row gap-3">
        
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={status === "loading"}
          className="flex-1 py-3 sm:py-0 sm:h-9 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#5851ed]/30 focus:border-[#5851ed] transition"
        />

        <Button
          onClick={handleSubmit}
          disabled={status === "loading" || !email}
          className="blue text-white text-sm px-4 rounded-xl primary-border cursor-pointer shadow-md uppercase"
        >
          {status === "loading" ? "Joining..." : "Get Early Access"}
        </Button>

      </div>

      {status === "error" && (
        <p className="text-xs text-red-500 mt-2 text-center max-w-md">
          {message}
        </p>
      )}

    </section>
  )
}
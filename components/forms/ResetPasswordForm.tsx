"use client"

import * as z from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPasswordSchema } from "@/lib/validations"
import { resetPassword } from "@/lib/actions/auth.action"

export const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()  
  const token = searchParams.get("token") ?? "" 

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    try {
      setIsLoading(true)

    const result = await resetPassword(token, data.password);
    if (result.success) alert("Password reset! Please login.");
    if (result.error) alert(result.error);

    router.push("/sign-in")


    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

return (
  <div className="font-inter sm:w-[400px] mx-auto flex items-center justify-center w-full">

    <div className="w-full bg-neutral-100 rounded-2xl p-1">

      {/* Logo */}
      <div className="flex flex-col items-center text-center bg-[#ffffff] rounded-xl py-5">
        <Image
          src="/assets/images/logo2.jpg"
          alt="logo"
          width={45}
          height={45}
          className="mb-3"
        />

        <h2 className="text-[12-px] font-semibold text-black">
          Reset your password
        </h2>

        <p className="text-sm text-black mt-1">
          Enter your new password below
        </p>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 px-4">

        {/* Password */}
          <div>
        <div className="flex justify-between">
          <label className="text-[12px] text-black">
            New password
          </label>
          </div>
          <Input
            {...form.register("password")}
            type="password"
            className="mt-1 h-[35px] bg-white border border-neutral-200 rounded-[10px] text-black shadow-none"
          />
        </div>

        {/* CTA */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 mt-2 blue primary-border text-white font-semibold rounded-xl cursor-pointer"
        >
          {isLoading ? "Loading..." : "CHANGE PASSWORD"}
        </Button>

      </form>

    </div>
  </div>
)
}
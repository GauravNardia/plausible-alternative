"use client"

import * as z from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validations"
import { loginUser } from "@/lib/actions/auth.action"

export const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true)

      const result = await loginUser(data.email, data.password)

      if (!result?.success) {
      setServerError(result?.error || "Invalid email or password")
      return
    }

      toast.success("Signed in successfully 🎉")

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      router.push("/sites")
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
          src="/assets/images/logo2.png"
          alt="logo"
          width={60}
          height={60}
          className="mb-3"
        />

        <h2 className="text-[12-px] font-semibold text-black">
          Signin to Puffin
        </h2>

        <p className="text-sm text-black mt-1">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-[#1f1f1f] font-medium hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 px-4">

        {/* Email */}
        <div>
          <label className="text-[12px] text-black">
            Email
          </label>
          <Input
            {...form.register("email")}
            type="email"
            className="mt-1 h-[35px] bg-white border border-neutral-200 rounded-[10px] text-black shadow-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-[12px] text-black">
            Password
          </label>
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
          {isLoading ? "Loading..." : "SIGN IN"}
        </Button>

      </form>

    </div>
  </div>
)
}
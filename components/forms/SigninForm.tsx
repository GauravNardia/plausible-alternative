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
  const [showPassword, setShowPassword] = useState(false)
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

      toast.success("Welcome to the flock!🎉", {
        style: {
          background: "#5851ed",
          color: "#ffffff",
        }
      })

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      // ✅ Check subscription status after login
    const session = await fetch("/api/auth/session").then(r => r.json())
    const userId = session?.user?.id

    if (userId) {
      const usage = await fetch(`/api/usage?userId=${userId}`).then(r => r.json())
      
      if (!usage.hasSubscription) {
        toast.error("Your trial ended. Pick a plan to continue")
        router.push("/pricing")
        return
      }
    }
      router.push("/sites")
    } catch (error) {
      toast.error("Oops, the puffin tripped! Try again?")
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-4 px-4"
        >
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
            <div className="flex justify-between">
              <label className="text-[12px] text-black">
                Password
              </label>
              <div>
                <Link
                  className="text-xs text-neutral-500 hover:underline"
                  href="/forgot-password"
                >
                  Forget password?
                </Link>
              </div>
            </div>

            <div className="relative mt-1">
              <Input
                {...form.register("password")}
                type={showPassword === true ? "text" : "password"}
                className="mt-1 h-[35px] bg-white border border-neutral-200 rounded-[10px] text-black shadow-none"
              />

              <div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  {showPassword ? (
                    <Image
                      src="/assets/icons/eye.svg"
                      width={18}
                      height={18}
                      alt="hide password"
                    />
                  ) : (
                    <Image
                      src="/assets/icons/eye-slash.svg"
                      width={18}
                      height={18}
                      alt="show password"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 mt-2 blue primary-border text-white font-semibold rounded-xl cursor-pointer uppercase"
          >
          {isLoading ? (
             <span className="flex items-center gap-2">
               <Image src="/assets/icons/spinner.svg" width={20} height={20} className="animate-spin" alt="loading" />
               Letting you in...
             </span>
           ) : (
             "Sign in"
           )}
          </Button>
        </form>
      </div>
    </div>
  )
}
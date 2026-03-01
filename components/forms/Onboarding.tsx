"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"
import { onboardingSchema } from "@/lib/validations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { onboardinguser } from "@/lib/actions/auth.action"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const OnboardingPage = () => {
    const router = useRouter()

      const form = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
          domain: "",
          site: "",
        },
      })

      async function onSubmit(data: z.infer<typeof onboardingSchema>) {
    try {
      const result = await onboardinguser(data.domain, data.site)

      if(result.success) {
        toast.success("Onboarding successful!")
       router.push(`/onboarding/install/${result.siteId}`)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
      }


return (
  <div className="font-inter sm:w-[400px] mx-auto flex items-center justify-center w-full">

    <div className="w-full bg-neutral-100 rounded-xl px-8 py-8">

      {/* Logo */}
      <div className="flex flex-col items-center text-center mb-6">
        <Image
          src="/assets/images/logo2.png"
          alt="logo"
          width={60}
          height={60}
          className="mb-3"
        />

        <h2 className="text-[12-px] font-semibold text-black">
          Welcome to Puffin Analytics
        </h2>

        <p className="text-sm text-black mt-1">
          Let's hatch your first website
        </p>
      </div>
      <Dialog>
  <DialogTrigger asChild>
    <Button
      className="w-full h-[35px] mt-2 bg-[#addb37] hover:bg-[#a7d13c] text-black font-medium rounded-[10px] cursor-pointer"
    >
      Add my website
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-sm text-center bg-neutral-100">
    <DialogHeader className="text-center">
      <div className="w-12 h-12 mx-auto bg-[#addb37] rounded-full flex items-center justify-center text-black font-bold">
        <Image
          src="/assets/images/logo2.png"
          alt="logo"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>

      <DialogTitle className="text-center text-[12-px] font-semibold text-black">
        Hatch your site
      </DialogTitle>

      <DialogDescription className="text-center text-sm text-black">
        Add your website to start tracking visitors instantly.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="mt-4">

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website domain</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example.com"
                    className="h-[35px] bg-white border border-neutral-200 rounded-[10px] text-black shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="site"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mysite"
                    className="h-[35px] bg-white border border-neutral-200 rounded-[10px] text-black shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

        </FieldGroup>

        <DialogFooter>
          <Button
            type="submit"
            className="h-[35px] mt-5 bg-[#addb37] hover:bg-[#a7d13c] text-black font-medium rounded-[10px] cursor-pointer"
          >
            Create Site
          </Button>
        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
</Dialog>
    </div>
  </div>
)
}







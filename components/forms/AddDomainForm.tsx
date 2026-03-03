"use client"
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
import { Button } from "../ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { onboardinguser } from "@/lib/actions/auth.action"
import { toast } from "sonner"

const AddDomainForm = () => {
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
        toast.success("Website added successfully!")
       router.push(`/onboarding/install/${result.siteId}`)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
      }

  return (
      <Dialog>
  <DialogTrigger asChild>
    <Button
      className="flex w-full h-[35px] mt-2 blue border-primary text-white font-semibold rounded-xl px-6 cursor-pointer"
    >
      <Image
        src="/assets/icons/add.svg"
        alt="logo"
        width={25}
        height={25}
      />
      Add New Website
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
            className="px-6 mt-5 blue border-primary text-white font-medium rounded-xl cursor-pointer"
          >
            Create Site
          </Button>
        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
</Dialog>  )
}

export default AddDomainForm
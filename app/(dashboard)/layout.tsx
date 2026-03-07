import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"
import Image from "next/image"
import Link from "next/link"
import ProfileDropdown from "@/components/charts/ProfileDropdown"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Puffin Analytics — Know exactly who's visiting your site",
  description: "Traffic insights — no cookies, no GDPR headaches, no bloat. Built for indie hackers & serious teams alike.",
  metadataBase: new URL("https://puffinanalytics.com"),
  openGraph: {
    title: "Puffin Analytics — Know exactly who's visiting your site",
    description: "Traffic insights — no cookies, no GDPR headaches, no bloat.",
    url: "https://puffinanalytics.com",
    siteName: "Puffin Analytics",
    images: [{ url: "/assets/og/homepage-og.png", width: 1200, height: 630, alt: "Puffin Analytics" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puffin Analytics — Know exactly who's visiting your site",
    description: "Real-time traffic insights — no cookies, no GDPR headaches, no bloat.",
    images: ["/assets/og/homepage-og.png"],
  },
}

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth()
  if (!session || !session.user?.email || !session.user?.id) {
    redirect('/sign-in')
  }

  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center border">
      <div className="w-full flex justify-between px-5 py-4 border-b border-gray-200">
        <div className="w-full flex justify-between items-center select-none gap-5">
        <Link href="/sites" className="flex items-center">
          <Image
            src="/assets/images/logo2.jpg"
            alt="Logo"
            width={30}
            height={30}
            className="mr-2 rounded-full"
          />
          <p className="text-xl font-semibold font-bpmf hidden sm:flex">Puffin Analytics</p>
        </Link>
          {/* Filter button portal target — only shows on domain pages */}
          <div id="dashboard-filter-slot" className="flex-1 flex justify-end" />
          <ProfileDropdown email={session.user.email} userId={session.user.id} />
        </div>
      </div>
      <div className="antialiased w-full">
        {children}
        <Toaster />
      </div>
    </section>
  )
}

export default DashboardLayout
import { Navbar } from "@/components/marketing/Navbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auth — Puffin Analytics",
  description: "Set up in 1 minutes. One script tag. No cookies. No lawyers required.",
  metadataBase: new URL("https://puffinanalytics.com"),
  openGraph: {
    title: "Set up in 1 minutes. Know your traffic forever.",
    description: "One script tag. No cookies. No lawyers required.",
    images: [{ url: "https://puffinanalytics.com/assets/og/homepage-og.png", width: 1200, height: 630, alt: "Sign Up for Puffin Analytics" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Set up in 5 minutes. Know your traffic forever.",
    description: "One script tag. No cookies. No lawyers required.",
    images: ["https://puffinanalytics.com/assets/og/homepage-og.png"],
  },
}

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <section className="w-full max-w-6xl border border-gray-200 mx-auto min-h-screen">
      
      {/* Navbar stays at top */}
      <div >
        <Navbar />
      </div>

      {/* Center content properly */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full">
          {children}
        </div>
      </div>

    </section>
  )
}

export default AuthLayout
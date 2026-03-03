import { Navbar } from "@/components/marketing/Navbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Puffin Analytics — Privacy-First Web Analytics for Modern Builders",
  description:
    "Simple, privacy-first web analytics built for developers and founders. No cookies. No tracking creepiness. Just fast, reliable insights.",
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
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

    </section>
  )
}

export default AuthLayout
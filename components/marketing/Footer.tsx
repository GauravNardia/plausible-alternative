import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-start">

        {/* Left */}
        <div className="flex flex-col gap-4">

        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo2.jpg"
            alt="Logo"
            width={30}
            height={30}
            className="mr-2 rounded-full"
          />
          <p className="text-xl font-semibold font-bpmf hidden sm:flex">Puffin Analytics</p>
        </Link>

          <p className="text-sm text-neutral-600 max-w-sm">
            Privacy-first analytics for modern builders.
          </p>

        </div>

        {/* Right */}
        <div className="flex md:justify-end gap-16">

          {/* <div>
            <p className="font-semibold text-black mb-4">Quick Links</p>

            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/pricing" className="hover:text-black transition">
                  Pricing
                </Link>
              </li>

              <li>
                <Link href="/sign-in" className="hover:text-black transition">
                  Sign in
                </Link>
              </li>
            </ul>

          </div> */}

          <div>
            <p className="font-semibold text-black mb-4">Legal</p>

            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/privacy" className="hover:text-black transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-black transition">
                  Terms of Service
                </Link>
              </li>
            </ul>

          </div>

        </div>

      </div>
      <div className="dot-bg h-[70px] border-t" />

      {/* Bottom */}
      <div className="border-t font-bpmf font-semibold border-gray-200 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Puffin Analytics
      </div>

    </footer>
  )
}
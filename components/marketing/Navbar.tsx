"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"

export const Navbar = () => {

  return (
    <header className="w-full border-b border-gray-200">
      <div className="w-full px-5 sm:px-5 mx-auto py-4 flex items-center justify-between">

        {/* Logo */}
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

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Buttons always visible (like screenshot) */}
          {/* <Link href="/sign-in">
            <Button className="white text-black text-sm px-3 md:px-6 rounded-xl secondary-border cursor-pointer shadow-md">
              LOG IN
            </Button>
          </Link> */}

          <Link href="#early-access">
            <Button className="blue text-white text-sm px-4 md:px-6 rounded-xl primary-border cursor-pointer shadow-md uppercase">
              get early access
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"

export const Navbar = () => {

  return (
    <header className="w-full border-b border-gray-200">
      <div className="w-full px-5 sm:px-5 mx-auto py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className=" items-center hidden sm:flex">
          <Image
            src="/assets/images/logo2.jpg"
            alt="Logo"
            width={170}
            height={170}
            className="mr-2 rounded-full"
          />
        </Link>
          <Link href="/" className=" items-center sm:hidden flex">
          <Image
            src="/assets/images/logo2.jpeg"
            alt="Logo"
            width={35}
            height={35}
            className="mr-2 rounded-full"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Buttons always visible (like screenshot) */}
          <Link href="/sign-in">
            <Button className="white text-black text-sm px-3 md:px-6 rounded-xl secondary-border cursor-pointer shadow-md">
              LOG IN
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="blue text-white text-sm px-4 md:px-6 rounded-xl primary-border cursor-pointer shadow-md">
              SIGN UP
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
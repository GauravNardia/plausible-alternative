"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full border-b border-gray-200">
      <div className="w-full px-5 sm:px-5 mx-auto py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className=" items-center hidden sm:flex">
          <Image
            src="/assets/images/logo.jpg"
            alt="Logo"
            width={170}
            height={170}
            className="mr-2 rounded-full"
          />
        </Link>
          <Link href="/" className=" items-center sm:hidden flex">
          <Image
            src="/assets/images/logo2.png"
            alt="Logo"
            width={35}
            height={35}
            className="mr-2 rounded-full"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
          <Link href="#">Product</Link>
          <Link href="#">Features</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Docs</Link>
          <Link href="#">Blog</Link>
        </nav>

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

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden ml-2"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-6 border-t">
          <nav className="flex flex-col gap-4 text-sm text-neutral-600 pt-4">
            <Link href="#">Product</Link>
            <Link href="#">Features</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Docs</Link>
            <Link href="#">Blog</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
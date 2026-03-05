"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutUser } from "@/lib/actions/auth.action"
import { shortenEmail } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Props {
    email: string;
    userId: string;
}

const ProfileDropdown = ({ email, userId }: Props) => {
    const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="white text-black text-sm px-3 md:px-6 rounded-xl secondary-border cursor-pointer">
            {shortenEmail(email)}
            <Image
            src="/assets/icons/arrow-down-black.svg"
            width={25}
            height={25}
            alt="arrow"
            />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" min-w-[12rem] rounded-xl bg-[#ffffff]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/profile/${userId}`)}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/billing/${userId}`)}>Billing</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500 focus:text-red-700 hover:text-red-700 focus:bg-transparent hover:bg-transparent" onClick={() => (logoutUser())}>Sign out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
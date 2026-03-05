import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import Link from "next/link";
import ProfileDropdown from "@/components/charts/ProfileDropdown";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Dashboard — Puffin Analytics",
  description:
    "View real-time insights, traffic sources, countries, devices, and page performance with Puffin Analytics.",

  robots: {
    index: false,
    follow: false,
  },
};

const DashboardLayout = async({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if(!session || !session.user?.email || !session.user?.id) {
    redirect('/sign-in')
  }
  const email = session.user?.email;
  const userId = session.user?.id;


  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center border">
        <div className="w-full flex justify-between px-5 py-4 border-b border-gray-200">
        <div className="w-full flex justify-between items-center select-none gap-5">
        <Link href="/sites" className="items-center">
          <Image
            src="/assets/images/logo.jpg"
            alt="Logo"
            width={170}
            height={170}
            className="mr-2 rounded-full"
          />
        </Link>

           <div>
            <ProfileDropdown email={email} userId={userId} />
            </div>
            </div>
        </div>
      <div
        className={` antialiased w-full `}
      >
        {children}
        <Toaster />
      </div>
    </section>
  );
}

export default DashboardLayout;
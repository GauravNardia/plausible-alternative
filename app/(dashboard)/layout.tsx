import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import AddDomainForm from "@/components/forms/AddDomainForm";
import Link from "next/link";


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
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center border">
        <div className="w-full flex justify-between px-5 py-4 border-b border-gray-200">
        <div className="w-full flex justify-between items-center select-none gap-5">
        <Link href="/dashboard" className="items-center">
          <Image
            src="/assets/images/logo.jpg"
            alt="Logo"
            width={170}
            height={170}
            className="mr-2 rounded-full"
          />
        </Link>

           <div>
                <AddDomainForm/>
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
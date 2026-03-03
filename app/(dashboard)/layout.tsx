import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import AddDomainForm from "@/components/forms/AddDomainForm";


export const metadata: Metadata = {
  title: "Dashboard — Puffin Analytics",
  description:
    "View real-time insights, traffic sources, countries, devices, and page performance with Puffin Analytics.",

  robots: {
    index: false,
    follow: false,
  },
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col justify-center">
        <div className="w-full flex justify-between px-5 py-8">
            <div className="flex justify-center items-center select-none">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full"
              /> 
              <h1 className="text-xl font-bold">Puffin Analytics</h1>
            </div>
            <div>
                <AddDomainForm/>
            </div>
        </div>
      <div
        className={` antialiased`}
      >
        {children}
        <Toaster />
      </div>
    </section>
  );
}

export default DashboardLayout;
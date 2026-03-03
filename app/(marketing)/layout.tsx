import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import AddDomainForm from "@/components/forms/AddDomainForm";


export const metadata: Metadata = {
  title: "Puffin Analytics — Privacy-First Web Analytics for Modern Builders",
  description:
    "Simple, privacy-first web analytics built for developers and founders. No cookies. No tracking creepiness. Just fast, reliable insights.",

  keywords: [
    "privacy analytics",
    "simple analytics",
    "plausible alternative",
    "google analytics alternative",
    "web analytics for developers",
    "cookie-less analytics",
  ],

  authors: [{ name: "Puffin Analytics" }],

  creator: "Puffin Analytics",
  metadataBase: new URL("https://puffinanalytics.com"),

  openGraph: {
    title: "Puffin Analytics — Simple. Privacy-First. Fast.",
    description:
      "Understand your traffic without spying on your users. No cookies. No personal data. Just clean analytics.",
    url: "https://puffinanalytics.com",
    siteName: "Puffin Analytics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Puffin Analytics Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Puffin Analytics — Privacy-First Web Analytics",
    description:
      "No cookies. No tracking. Just fast, simple analytics for modern builders.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const MarketingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full max-w-6xl border mx-auto flex flex-col justify-center">
      <div
        className={` antialiased`}
      >
        {children}
      </div>
    </section>
  );
}

export default MarketingLayout;
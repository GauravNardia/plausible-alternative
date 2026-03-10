
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ProgressBar from "@/components/shared/Progressbar";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  metadataBase: new URL("https://www.puffinanalytics.com"),

  openGraph: {
    title: "Puffin Analytics — Simple. Privacy-First. Fast.",
    description:
      "Understand your traffic without spying on your users. No cookies. No personal data. Just clean analytics.",
    url: "https://www.puffinanalytics.com",
    siteName: "Puffin Analytics",
    images: [
      {
        url: "https://www.puffinanalytics.com/assets/og/homepage-og.png",
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
    images: ["https://www.puffinanalytics.com/assets/og/homepage-og.png"],
  },

  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 sm:px-0`}
      >
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {children}
        <script defer src="https://puffinanalytics.com/script" data-api-key="pk_live_d439011ce675f7fbb47c0d1e80f7d82ce22aba7faa73208feda79e4597316bf8"></script>
        <Toaster />
      </body>
    </html>
  );
}

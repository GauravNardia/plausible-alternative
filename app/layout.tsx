import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

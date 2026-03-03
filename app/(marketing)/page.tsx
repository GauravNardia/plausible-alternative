import { CTA } from '@/components/marketing/Cta'
import { FeaturesSection } from '@/components/marketing/Features'
import { Footer } from '@/components/marketing/Footer'
import { Hero } from '@/components/marketing/Hero'
import { Navbar } from '@/components/marketing/Navbar'
import { SetupSection } from '@/components/marketing/SetupSection'
import { SocialProof } from '@/components/marketing/SocialProof'
import React from 'react'

const MarketingPage = () => {
  return (
  <main className="bg-[#ffffff] text-black">
      <Navbar />
      <Hero />
      <SocialProof />
      <SetupSection />
      <SocialProof />
      <FeaturesSection/>
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  )
}

export default MarketingPage
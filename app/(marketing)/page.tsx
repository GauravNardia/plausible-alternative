import { CTA } from '@/components/marketing/Cta'
import { FeaturesSection } from '@/components/marketing/Features'
import { Footer } from '@/components/marketing/Footer'
import { Hero } from '@/components/marketing/Hero'
import { SetupSection } from '@/components/marketing/SetupSection'
import { SocialProof } from '@/components/marketing/SocialProof'
import MarketingPricing from '@/components/marketing/Pricing'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const MarketingPage = async() => {
  const session = await auth();
  if(session?.user?.id) (
    redirect("/sites")
  )

  return (
  <main className="bg-[#ffffff] text-black">
      <Hero />
      <SocialProof />
      <SetupSection />
      <SocialProof />
      <FeaturesSection/>
      <MarketingPricing/>
      <CTA />
      <Footer />
    </main>
  )
}

export default MarketingPage
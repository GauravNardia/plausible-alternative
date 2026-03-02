import { auth } from "@/auth"
import { OnboardingPage } from "@/components/forms/Onboarding"
import { isUserOnboarded } from "@/lib/actions/auth.action"
import { redirect } from "next/navigation"

const Onboarding = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect("/sign-in")
  }

  const { success, onboarded } = await isUserOnboarded(userId)

  if (!success) {
    redirect("/sign-in")
  }

  // ✅ If already onboarded → go to dashboard
  if (onboarded) {
    redirect("/dashboard")
  }

  // ✅ If NOT onboarded → show onboarding page
  return (
    <main className="w-full bg-[#ffffff] flex flex-col items-center justify-center sm:px-4 sm:py-16">
      <OnboardingPage />
    </main>
  )
}

export default Onboarding
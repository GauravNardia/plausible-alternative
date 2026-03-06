import { auth } from '@/auth'
import { SignupForm } from '@/components/forms/Signup'
import { redirect } from 'next/navigation'

const Signup = async() => {
    const session = await auth()

  if (session) {
    redirect("/sites")
  }

  return (
    <main
      className="w-full bg-[#ffffff] flex flex-col items-center justify-center sm:px-4 sm:py-16">
      <SignupForm />
    </main> 
  )
}

export default Signup
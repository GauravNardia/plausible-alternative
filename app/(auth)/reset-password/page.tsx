import { ResetPasswordForm } from '@/components/forms/ResetPasswordForm'
import { Suspense } from 'react'

const ResetPassword = () => {
  return (
    <section className="w-full bg-[#ffffff] flex flex-col items-center justify-center sm:px-4 sm:py-16">
      <Suspense>
      <ResetPasswordForm/>
      </Suspense>
    </section>
  )
}

export default ResetPassword
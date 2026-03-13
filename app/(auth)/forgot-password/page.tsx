import { ForgotPasswordForm } from '@/components/forms/ForgotPsswordForm'
import React from 'react'

const ForgotPassword = () => {
  return (
    <section className="w-full bg-[#ffffff] flex flex-col items-center justify-center sm:px-4 sm:py-16">
      <ForgotPasswordForm/>
    </section>
  )
}

export default ForgotPassword
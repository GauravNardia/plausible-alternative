import { auth } from "@/auth"
import { SigninForm } from "@/components/forms/SigninForm"
import { redirect } from "next/navigation"

const Signin = async() => {
    // const session = await auth()
  
    // if (session) {
    //   redirect("/home")
    // }
  
  return (
    <main
      className="w-full bg-[#ffffff] flex flex-col items-center justify-center sm:px-4 sm:py-16">
      <SigninForm />
    </main> 
  )
}

export default Signin
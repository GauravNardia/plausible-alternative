import Link from "next/link"
import { Button } from "../ui/button"

export const CTA = () => {
  return (
    <section className="white text-black py-24 text-center flex flex-col items-center">
      
      <h2 className="text-3xl md:text-4xl font-semibold font-bpmf">
        Stop Tracking People.
        <br />
        Start Understanding Traffic.
      </h2>

      {/* <div className="mt-8 w-full max-w-md">
        <WaitlistForm />
      </div> */}

      <Link href="/sites">
        <Button className="mt-8 text-sm uppercase text-white px-8 py-3 rounded-xl blue primary-border cursor-pointer">
          Start Tracking Now
        </Button>
      </Link>

    </section>
  )
}
import Link from "next/link"
import { Button } from "../ui/button"

export const CTA = () => {
  return (
    <section className="bg-neutral-100 text-black py-24 text-center">
      <h2 className="text-3xl font-semibold font-bpmf">
        Stop Tracking People.
        <br />
        Start Understanding Traffic.
      </h2>

      <Link href="/sites">
       <Button className="mt-8 text-sm text-white px-8 py-3 rounded-xl blue primary-border cursor-pointer">
         Start Tracking Now
      </Button>
   </Link>
    </section>
  )
}
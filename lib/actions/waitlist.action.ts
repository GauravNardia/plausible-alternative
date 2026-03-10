"use server"

import { db } from "@/database/drizzle"
import { waitlist } from "@/database/schema"
import { Resend } from "resend"
import { eq } from "drizzle-orm"

const resend = new Resend(process.env.RESEND_API_KEY!)

export const joinWaitlist = async (email: string) => {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email address." }
    }

    // Check if already on waitlist
    const existing = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, email))
      .limit(1)

    if (existing.length) {
      return { success: false, error: "You're already on the waitlist!" }
    }

    // Save to DB
    await db.insert(waitlist).values({ email })

    // Send confirmation email to user
    await resend.emails.send({
      from: "Puffin Analytics <gaurav@puffinanalytics.com>",  
      to: email,
      subject: "You're on the waitlist!",
      html: `
      <h1 style="font-size:28px;margin-bottom:16px">
You're officially on the Puffin waitlist 🎉
</h1>

<p style="color:#444;margin-bottom:16px">
Thanks for signing up — I really appreciate it.
</p>

<p style="color:#444;margin-bottom:16px">
Puffin is a simple, privacy-first analytics tool built for developers, founders, and indie hackers who just want to understand their traffic without dealing with cookies, bloated dashboards, or complicated setups.
</p>

<p style="margin-top:20px;color:#444">
I'm gradually inviting people from the waitlist and you'll be among the first to try Puffin.
</p>

<p style="margin-top:16px;color:#444">
Thanks again for the support — it genuinely means a lot.
</p>

<p style="margin-top:20px;color:#444">
Gaurav<br>
Founder, Puffin Analytics
</p>
      `,
    })

    // Notify yourself
    await resend.emails.send({
      from: "Puffin Analytics <gaurav@puffinanalytics.com>",
      to: "hey.gauravnardia@gmail.com",
      subject: `New waitlist signup: ${email}`,
      html: `<p><strong>${email}</strong> just joined the waitlist.</p>`,
    })

    return { success: true }
  } catch (err) {
    console.error("[joinWaitlist]", err)
    return { success: false, error: "Something went wrong. Try again." }
  }
}
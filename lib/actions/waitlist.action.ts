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
      from: "Puffin Analytics <onboarding@resend.dev>", // use this until you have domain
      to: "hey.gauravnardia@gmail.com",
      subject: "You're on the waitlist!",
      html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif;background:#ffffff;padding:40px">
        <div style="max-width:600px;margin:0 auto;border:1px solid #e5e5e5;border-radius:12px;padding:32px">

          <img 
            src={"${process.env.APP_URL!}/assets/og/banner.png" }
            style="width:100%;border-radius:8px;border:1px solid #eee;margin-bottom:24px"
          />

          <h1 style="font-size:24px;margin-bottom:12px">
            You're officially on the Puffin waitlist 🎉
          </h1>

          <p style="color:#444;margin-bottom:20px">
            Thanks for signing up for early access.
          </p>

          <p style="color:#444;margin-bottom:16px">
            Puffin is a privacy-first analytics tool built for developers and indie hackers.
          </p>

          <h3 style="margin-top:24px">Why Puffin?</h3>

          <ul style="color:#444">
            <li>No cookies</li>
            <li>Lightweight script</li>
            <li>No bloated dashboards</li>
            
          </ul>

          <p style="margin-top:20px">
            We'll send your invite soon 👀
          </p>

          <div style="margin-top:28px;text-align:left">
            <a 
              href="https://puffinanalytics.com"
              style="
                background:#5851ed;
                color:#ffffff;
                padding:12px 24px;
                border-radius:10px;
                text-decoration:none;
                font-weight:600;
                display:inline-block;
              "
            >
              Visit Puffin Analytics
            </a>
          </div>

          <p style="margin-top:32px;font-size:13px;color:#888;text-align:center">
            You're receiving this because you signed up at puffinanalytics.com
          </p>

        </div>
      </div>
      `,
    })

    // Notify yourself
    await resend.emails.send({
      from: "Puffin Analytics <onboarding@resend.dev>",
      to: "your@email.com", // ← your personal email
      subject: `New waitlist signup: ${email}`,
      html: `<p><strong>${email}</strong> just joined the waitlist.</p>`,
    })

    return { success: true }
  } catch (err) {
    console.error("[joinWaitlist]", err)
    return { success: false, error: "Something went wrong. Try again." }
  }
}
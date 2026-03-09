import { auth } from "@/auth";
import DodoPayments from "dodopayments";
import { NextRequest, NextResponse } from "next/server";

const dodopayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const session = await auth()

    if (!session?.user?.id || !session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

   const productId = body.product_cart?.[0]?.product_id

    if (!productId)
      return NextResponse.json({ error: "Missing product id" }, { status: 400 })

    const checkout = await dodopayments.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        name: session.user.name!,
        email: session.user.email,
      },

      metadata: {
        email: session.user.email,
        userId: session.user.id,
      },

      return_url: `${process.env.APP_URL!}/sites`,
    })

    return NextResponse.json({
      url: checkout.checkout_url,
    })
} catch (error: any) {
  console.error(error)
  return NextResponse.json(
    { error: "Checkout failed", message: error?.message ?? String(error) },
    { status: 500 }
  )
}
}
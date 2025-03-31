import { authOption } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "Please define the STRIPE_SECRET_KEY environment variable inside .env"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error(
      "Please define the NEXT_PUBLIC_APP_URL environment variable inside .env"
    );
  }
  try {
    const sessionData = await getServerSession(authOption);

    const userId = sessionData?.user?.id; // Get user ID from session

    const { amount } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI Image Credits",
              description: "30 AI image credits per $1",
            },
            unit_amount: Math.round(amount * 100), // Convert dollars to cents and ensure it's an integer
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure`,
      metadata: { userId: userId || "unknown" }, // Ensure userId is a string
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

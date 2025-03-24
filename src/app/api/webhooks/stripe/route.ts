import { NextResponse } from "next/server";
import Stripe from "stripe";
import User from "@/app/model/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error(
      "Please define the STRIPE_WEBHOOK_SECRET environment variable inside .env"
    );
  }

  const payload = await req.text();

  const signature = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId; // Store userId when creating a Stripe session

      const creditsPurchased = (30 * Number(session.amount_total)) / 100; // Assuming $1 = 30 credits

      if (userId) {
        await User.updateOne(
          { _id: userId },
          { $inc: { credits: creditsPurchased } }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}

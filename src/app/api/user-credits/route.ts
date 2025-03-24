import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import User from "@/app/model/user";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

//  Get User Credits
export async function GET() {
  const session = await getServerSession(authOption);
  if (!session || !session.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDB();
  const user = await User.findOne({ email: session.user.email });

  return NextResponse.json({ credits: user?.credits || 0 });
}

// Add Credits (After Successful Payment)
export async function POST(req: Request) {
  const session = await getServerSession(authOption);
  if (!session || !session.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { amount } = await req.json(); // Get the amount of credits to add

  await connectToDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  user.credits += amount; //  Add credits
  await user.save();

  return NextResponse.json({ message: "Credits added", credits: user.credits });
}

//  Deduct Credit when generating an image
export async function PUT() {
  const session = await getServerSession(authOption);
  if (!session || !session.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.credits <= 0)
    return NextResponse.json(
      { error: "Insufficient credits" },
      { status: 403 }
    );

  user.credits -= 1; // Deduct 1 credit per image generation
  await user.save();

  return NextResponse.json({
    message: "Credit deducted",
    credits: user.credits,
  });
}

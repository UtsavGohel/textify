import User from "@/app/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { authOption } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOption);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const { prompt } = await req.json();

  if (!process.env.NEXT_PUBLIC_NEBIUS_API_KEY) {
    throw new Error(
      "Please define the NEBIUS_API_KEY environment variable inside .env"
    );
  }

  // Fetch user credits from DB
  const user = await User.findById(userId).select("credits");

  if (!user || user.credits <= 0) {
    return NextResponse.json(
      { error: "Insufficient credits" },
      { status: 403 }
    );
  }

  const client = await new OpenAI({
    baseURL: "https://api.studio.nebius.com/v1/",
    apiKey: process.env.NEXT_PUBLIC_NEBIUS_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.images.generate({
    model: "black-forest-labs/flux-dev",
    response_format: "url",
    extra_body: {
      response_extension: "webp",
      width: 1024,
      height: 1024,
      num_inference_steps: 28,
      negative_prompt: "",
      seed: -1,
    },
    prompt: `Imagine you are my AI image assistant. Generate an accurate and well-balanced image where all objects are clearly visible. Here is my prompt: ${prompt}`,
  });

  // Deduct 1 credit
  await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

  return NextResponse.json({ imageUrl: response.data[0].url });
}

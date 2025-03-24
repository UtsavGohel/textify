import { connectToDB } from "@/app/lib/mongodb";
import User from "@/app/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectToDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: "User Already Exist" }, { status: 400 });
  }

  const hashPwd = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashPwd });
  const user = await newUser.save();

  if (!user) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}

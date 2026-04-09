import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    console.log("SESSION:", session);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("BODY:", body);

    const user = await User.findOne({ email: session.user.email });
    console.log("FOUND USER:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (body.bio !== undefined) user.bio = body.bio;
    if (body.gender !== undefined) user.gender = body.gender;
    if (body.location !== undefined) user.location = body.location;
    if (body.name !== undefined) user.name = body.name;

    if (body.password) {
      const hashed = await bcrypt.hash(body.password, 10);
      user.password = hashed;
    }

    await user.save();

    console.log("UPDATED USER:", user);

    return NextResponse.json({ message: "Profile updated" });
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

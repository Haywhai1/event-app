import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 });
  return NextResponse.json(events);
}

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   if (session.user.role !== "admin")
//     return NextResponse.json(
//       { error: "Forbidden – Admin only" },
//       { status: 403 }
//     );

//   try {
//     await connectDB();
//     const data = await req.json();

//     const event = await Event.create({
//       ...data,
//       createdBy: session.user.id,
//     });

//     return NextResponse.json(event, { status: 201 });
//   } catch (error) {
//     console.error("Create event error:", error);
//     return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.user.role !== "admin")
    return NextResponse.json({ error: "Admin only" }, { status: 403 });

  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("coverImage") as File;

    // convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // upload to cloudinary
    const uploadRes = await cloudinary.uploader.upload(base64, {
      folder: "events",
    });

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const event = await Event.create({
      title: formData.get("title"),
      category: formData.get("category"),
      date: formData.get("date"),
      time: formData.get("time"),
      price: Number(formData.get("price")),
      location: formData.get("location"),
      about: formData.get("about"),
      coverImage: uploadRes.secure_url, // ✅ CLOUDINARY URL
      createdBy: session.user.id,
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

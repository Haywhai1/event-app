import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

/* =========================
   GET EVENT
========================= */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* =========================
   PATCH EVENT
========================= */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const { id } = await context.params;
    const formData = await req.formData();

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    let imageUrl = event.coverImage;

    const file = formData.get("coverImage") as File | null;

    // 🔥 IF NEW IMAGE
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "events" }, (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          })
          .end(buffer);
      });

      imageUrl = upload.secure_url;
    }

    const updated = await Event.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),
        location: formData.get("location"),
        about: formData.get("about"),
        date: formData.get("date"),
        time: formData.get("time"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        coverImage: imageUrl,
      },
      { new: true },
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

/* =========================
   DELETE EVENT
========================= */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const { id } = await context.params;

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // 🔥 OPTIONAL: delete image
    if (event.coverImage) {
      const publicId = event.coverImage.split("/").pop()?.split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`events/${publicId}`);
      }
    }

    await Event.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ REQUIRED in your setup

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.user.role !== "admin")
    return NextResponse.json(
      { error: "Forbidden – Admin only" },
      { status: 403 },
    );

  try {
    await connectDB();
    const data = await req.json();

    const updated = await Event.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updated)
      return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update event error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.user.role !== "admin")
    return NextResponse.json(
      { error: "Forbidden – Admin only" },
      { status: 403 },
    );

  try {
    await connectDB();

    const deleted = await Event.findByIdAndDelete(params.id);

    if (!deleted)
      return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Delete event error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
}

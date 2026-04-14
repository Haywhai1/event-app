import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import EventForm from "@/components/EventForm";
import BackButton from "@/components/BackButton";

async function getEvent(id: string) {
  await connectDB();

  const event = await Event.findById(id).lean();

  if (!event) return null;

  return JSON.parse(JSON.stringify(event));
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getEvent(id);

  if (!event) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6">
      <BackButton href="/events" />
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Update Event
      </h2>

      {/* ✅ REUSED FORM */}
      <EventForm initialData={event} isEdit />
    </div>
  );
}
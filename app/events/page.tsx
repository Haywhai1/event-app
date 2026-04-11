import Event from "@/models/Event";
import { connectDB } from "@/lib/db";
import { EventType } from "@/types/event";
import EventCard from "@/components/EventCard";

async function getEvents(): Promise<EventType[]> {
  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(events));
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4">All Events</h1>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
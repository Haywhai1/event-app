import Event from "@/models/Event";
import { connectDB } from "@/lib/db";
import { EventType } from "@/types/event";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import BackButton from "@/components/BackButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import CreateEventButton from "@/components/CreateEventButton";

async function getEvents(): Promise<EventType[]> {
  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(events));
}

export default async function EventsPage() {
  const events = await getEvents();

  // ✅ GET SESSION (SERVER SAFE)
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="p-4 md:p-6  bg-gray-900 min-h-screen relative">
      <BackButton href="/events" />

      <div className="mt-12">
        <SearchBar />
      </div>

      <h1 className="text-2xl font-semibold my-4">All Events</h1>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-10">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* ✅ ADMIN FLOATING BUTTON */}
      {isAdmin && <CreateEventButton />}
    </div>
  );
}
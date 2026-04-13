// "use client";

// import { useSession } from "next-auth/react";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard2";
import GradientBanner from "@/components/GradientBanner";
import CategoryCard from "@/components/CategoryCard";
import BottomNav from "@/components/BottomNav";
import ProfileMenu from "@/components/ProfileMenu";
import Event from "@/models/Event";
import { connectDB } from "@/lib/db";
import { EventType } from "@/types/event";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ViewAllButton from "@/components/ViewAllButton";

async function getPopularEvents(): Promise<EventType[]> {
  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 }).limit(3).lean();

  return JSON.parse(JSON.stringify(events));
}

export default async function ExplorePage() {
  const popularEvents = await getPopularEvents();
  // const { data: session, status } = useSession();
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;

  return (
    <div
      className="relative min-h-screen pb-20 px-4 
bg-gradient-to-b from-[#0f172a] via-[#020617] to-black"
    >
      {/* Glow overlay */}
      <div
        className="absolute top-0 left-0 w-full h-64 
  bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="mt-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-sm">
              {session ? `Hello ${name}` : "Hello Guest"}
            </h2>

            <ProfileMenu />
          </div>

          <h1 className="text-2xl font-semibold mt-1">
            Explore Amazing Events
          </h1>
        </header>

        {/* Search */}
        <SearchBar />

        {/* Popular Events */}
        <section className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold mb-3">Popular Events 🔥</h3>

            <ViewAllButton href="/events" />
          </div>

          {/* Mobile Scroll */}
          <div className="flex gap-4 overflow-x-auto lg:hidden">
            {popularEvents.map((event: EventType) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {popularEvents.map((event: EventType) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </section>

        {/* Gradient Banner */}
        <section className="mt-8">
          <h3 className=" text-xl font-semibold mb-3">For You</h3>
          <GradientBanner />
        </section>

        {/* Categories */}
        <section className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">Categories</h3>
            <ViewAllButton href="/categories" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <CategoryCard label="Concerts" count={31} />
            <CategoryCard label="Movies" count={21} />
            <CategoryCard label="Tech" count={24} />
          </div>
        </section>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}

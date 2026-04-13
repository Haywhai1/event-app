"use client";

import Image from "next/image";
import { useState } from "react";

/* ✅ TYPE (fixes "any" error) */
type EventType = {
  title: string;
  date: string;
  time: string;
  about: string;
  location: string;
  price: number;
  coverImage?: string;
};

export default function EventClient({ event }: { event: EventType }) {
  const [tab, setTab] = useState<"about" | "location" | "participants">(
    "about"
  );

  const date = new Date(event.date);

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      
      {/* IMAGE */}
      <div className="relative w-full h-[45vh]">
        <Image
          src={event.coverImage || "/fallback.jpg"}
          alt={event.title}
          fill
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* TITLE */}
      <div className="px-4 mt-4">
        <h1 className="text-2xl font-semibold">{event.title}</h1>
        <p className="text-gray-400 text-sm mt-1">
          {date.toDateString()} • {event.time}
        </p>
      </div>

      {/* TABS */}
      <div className="px-4 mt-6">
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl ">
          
          <Tab active={tab === "about"} onClick={() => setTab("about")}>
            About
          </Tab>

          <Tab active={tab === "location"} onClick={() => setTab("location")}>
            Location
          </Tab>

          <Tab active={tab === "participants"} onClick={() => setTab("participants")}>
            Participants
          </Tab>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 ">
        {tab === "about" && (
          <Content>{event.about}</Content>
        )}

        {tab === "location" && (
          <Content>{event.location}</Content>
        )}

        {tab === "participants" && (
          <Content>No participants yet</Content>
        )}
      </div>

      {/* CTA */}
      <div className="fixed bottom-4 left-4 right-4 mt-4">
        <button className="w-full h-14 rounded-xl font-semibold text-white
        bg-gradientPrimary shadow-lg">
          Buy Tickets for ${event.price}
        </button>

        <button className="w-full h-14 rounded-xl font-semibold text-white
        bg-gray-500 my-2
        ">
          Save for later
        </button>
      </div>
    </div>
  );
}

/* TAB */
function Tab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-lg text-sm transition ${
        active
          ? "bg-white text-black font-medium"
          : "text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

/* CONTENT CARD */
function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className=" text-white rounded-2xl py-1 text-sm leading-relaxed">
      {children}
    </div>
  );
}
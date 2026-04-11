"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { EventType } from "@/types/event";

interface Props {
  event: EventType;
}

export default function EventCard({ event }: Props) {
  const router = useRouter();

  const date = new Date(event.date);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();

  return (
    <div
      onClick={() => router.push(`/events/${event._id}`)}
      className="relative rounded-2xl overflow-hidden cursor-pointer w-full h-56 md:h-64 lg:h-80 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:scale-[1.02] transition-all duration-300 group"
    >
      <Image
        src={event.coverImage || "/fallback.jpg"}
        alt={event.title}
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-500 border-4 border-white/100 rounded-2xl"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-white/90 text-black text-xs font-semibold flex flex-col items-center shadow-md">
        <span className="text-[10px] uppercase text-gray-600">{month}</span>
        <span className="text-sm font-bold">{day}</span>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-xs text-gray-300">{event.category}</p>
        <h3 className="text-lg font-semibold text-white">
          {event.title}
        </h3>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
    </div>
  );
}
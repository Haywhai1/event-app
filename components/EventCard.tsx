"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EventType } from "@/types/event";
import Loader from "./Loader";

interface Props {
  event: EventType;
}

export default function EventCard({ event }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false); // click loader
  const [imgLoading, setImgLoading] = useState(true); // skeleton

  const handleClick = () => {
    if (loading) return; // ✅ prevent multiple clicks
    setLoading(true);
    router.push(`/events/${event._id}`);
  };

  const date = new Date(event.date);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();

  return (
    <div
      onClick={handleClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer w-full h-56 md:h-64 lg:h-80 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:scale-[1.02] transition-all duration-300 group"
    >
      {/* ✅ SKELETON */}
      {imgLoading && (
        <div className="absolute inset-0 animate-pulse bg-white/10 z-[1]" />
      )}

      {/* IMAGE */}
      <Image
        src={event.coverImage || "/fallback.jpg"}
        alt={event.title}
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setImgLoading(false)} // ✅ remove skeleton
        className={`object-cover transition-all duration-500 border-4 border-white/100 rounded-2xl ${
          imgLoading ? "scale-105 blur-sm" : "group-hover:scale-110"
        }`}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* DATE BADGE */}
      <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-white/90 text-black text-xs font-semibold flex flex-col items-center shadow-md">
        <span className="text-[10px] uppercase text-gray-600">{month}</span>
        <span className="text-sm font-bold">{day}</span>
      </div>

      {/* TEXT */}
      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-xs text-gray-300">{event.category}</p>
        <h3 className="text-lg font-semibold text-white">
          {event.title}
        </h3>
      </div>

      {/* CLICK LOADER OVERLAY */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* BORDER */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
    </div>
  );
}
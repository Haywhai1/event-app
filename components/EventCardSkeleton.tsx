"use client";

export default function EventCardSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden w-full h-56 md:h-64 lg:h-80 bg-white/5 border border-white/10 animate-pulse">
      
      {/* IMAGE SKELETON */}
      <div className="absolute inset-0 bg-white/10" />

      {/* DATE BADGE */}
      <div className="absolute top-3 right-3 w-12 h-10 bg-white/20 rounded-lg" />

      {/* TEXT */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <div className="w-20 h-3 bg-white/20 rounded" />
        <div className="w-32 h-4 bg-white/30 rounded" />
      </div>
    </div>
  );
}
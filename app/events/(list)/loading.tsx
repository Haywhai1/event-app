import EventCardSkeleton from "@/components/EventCardSkeleton";

export default function Loading() {
  return (
    <div className="p-4 md:p-6 bg-black min-h-screen">
      {/* SEARCH BAR SKELETON */}
      <div className="w-full h-12 bg-white/10 rounded-xl animate-pulse mb-4" />

      {/* TITLE SKELETON */}
      <div className="w-40 h-6 bg-white/20 rounded mb-6 animate-pulse" />

      {/* GRID SKELETON */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
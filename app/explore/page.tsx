import React from "react";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import GradientBanner from "@/components/GradientBanner";
import CategoryCard from "@/components/CategoryCard";
import BottomNav from "@/components/BottomNav";

export default function ExplorePage() {
  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Header */}
      <header className="mt-6 mb-4">
        <h2 className="text-grayText text-sm">Hello Username</h2>
        <h1 className="text-2xl font-semibold mt-1">Explore Amazing Events</h1>
      </header>

      {/* Search */}
      <SearchBar />

      {/* Popular Events */}
      <section className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold mb-3">Popular Events 🔥</h3>
          <a className="text-xs text-accentBlue" href="/events">
            View all
          </a>
        </div>

        <div>
  {/* Mobile Scroll */}
  <div className="flex gap-4 overflow-x-auto lg:hidden">
    <EventCard />
    <EventCard />
    <EventCard />
  </div>

  {/* Desktop Grid */}
  <div className="hidden lg:grid grid-cols-3 gap-6">
    <EventCard />
    <EventCard />
    <EventCard />
  </div>
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
          <a className="text-xs text-accentBlue" href="/categories">
            View all
          </a>
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
  );
}

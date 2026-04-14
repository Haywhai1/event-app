"use client";

import BackButton from "@/components/BackButton";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <BackButton href="/events" />

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Create Event
      </h2>

      {/* ✅ REUSABLE FORM */}
      <EventForm />
    </div>
  );
}
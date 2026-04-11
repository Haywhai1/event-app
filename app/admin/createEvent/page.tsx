"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/events", {
      method: "POST",
      body: formData, // ✅ IMPORTANT
    });

    if (res.ok) {
      router.push("/events");
    } else {
      alert("Failed to create event");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>

      <form
        onSubmit={handleCreate}
        className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          required
          className="w-full bg-white/10 p-3 rounded-xl outline-none"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="w-full bg-white/10 p-3 rounded-xl outline-none"
        />

        <textarea
          name="about"
          placeholder="Event Description"
          required
          className="w-full bg-white/10 p-3 rounded-xl outline-none h-32"
        />

        <input
          type="date"
          name="date"
          required
          className="w-full bg-white/10 p-3 rounded-xl outline-none"
        />

        <input
          type="time"
          name="time"
          required
          className="w-full bg-white/10 p-3 rounded-xl outline-none"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full bg-white/10 p-3 rounded-xl outline-none"
        />

        <input
          type="file"
          name="coverImage"
          accept="image/*"
          required
          className="w-full bg-white/10 p-3 rounded-xl outline-none"
        />

        <select
          name="category"
          className="w-full bg-white/10 p-3 rounded-xl outline-none"
        >
          <option value="Concert">Concert</option>
          <option value="Movie">Movie</option>
          <option value="Tech">Tech</option>
          <option value="Party">Party</option>
          <option value="Sport">Sport</option>
          <option value="Others">Others</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

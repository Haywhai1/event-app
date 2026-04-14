"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type EventType = {
  _id?: string;
  title: string;
  location: string;
  about: string;
  date: string;
  time: string;
  price: number;
  category?: string;
};

export default function EventForm({
  initialData,
  isEdit,
}: {
  initialData?: EventType;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const url = isEdit
      ? `/api/events/${initialData?._id}`
      : "/api/events";

    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      setMessage(isEdit ? "Updated successfully 🎉" : "Created successfully 🎉");

      setTimeout(() => {
        router.push(
          isEdit ? `/events/${initialData?._id}` : "/events"
        );
      }, 1000);
    } else {
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur space-y-4"
    >
      <input
        name="title"
        defaultValue={initialData?.title}
        placeholder="Event Title"
        required
        className="input text-black"
      />

      <input
        name="location"
        defaultValue={initialData?.location}
        placeholder="Location"
        required
        className="input text-black"
      />

      <textarea
        name="about"
        defaultValue={initialData?.about}
        placeholder="Event Description"
        required
        className="input h-32 text-black"
      />

      <input
        type="date"
        name="date"
        defaultValue={initialData?.date?.split("T")[0]}
        required
        className="input text-black"
      />

      <input
        type="time"
        name="time"
        defaultValue={initialData?.time}
        required
        className="input text-black"
      />

      <input
        type="number"
        name="price"
        defaultValue={initialData?.price}
        placeholder="Price"
        className="input text-black"
      />

        <input
          type="file"
          name="coverImage"
          required
          className="input "
        />
      
      <select
        name="category"
        defaultValue={initialData?.category}
        className="input text-black"
      >
        <option>Concert</option>
        <option>Movie</option>
        <option>Tech</option>
        <option>Party</option>
        <option>Sport</option>
        <option>Others</option>
      </select>

      {message && (
        <p className="text-sm text-green-400">{message}</p>
      )}

      <button
        disabled={loading}
        className="w-full bg-gradientPrimary p-3 rounded-xl"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
          ? "Update Event"
          : "Create Event"}
      </button>
    </form>
  );
}
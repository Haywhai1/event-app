"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function AdminEventActions({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"edit" | "delete" | null>(null);

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this event?");
    if (!confirmDelete) return;

    setLoading("delete");

    const res = await fetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });

    setLoading(null);

    if (res.ok) {
      alert("Event deleted");
      router.push("/events");
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-50">
      
      {/* EDIT */}
      <button
        onClick={() => {
          setLoading("edit");
          router.push(`/admin/edit/${eventId}`);
        }}
        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-105 transition"
      >
        {loading === "edit" ? (
          <Loader small />
        ) : (
          <Pencil size={16} className="text-black" />
        )}
      </button>

      {/* DELETE */}
      <button
        onClick={handleDelete}
        className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow hover:scale-105 transition"
      >
        {loading === "delete" ? (
          <Loader small />
        ) : (
          <Trash2 size={16} className="text-white" />
        )}
      </button>
    </div>
  );
}
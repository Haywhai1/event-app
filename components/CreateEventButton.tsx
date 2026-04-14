"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Loader from "@/components/Loader";

export default function CreateEventButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => {
          setLoading(true);
          router.push("/admin/createEvent");
        }}
        className="
          w-16 h-16 rounded-full 
          bg-gradientPrimary
          flex items-center justify-center
          shadow-lg hover:scale-105 transition
        "
      >
        {loading ? (
          <Loader small />
        ) : (
          <Plus size={28} className="text-white" />
        )}
      </button>
    </div>
  );
}
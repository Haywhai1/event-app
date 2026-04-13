"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  href?: string; // optional fallback route
};

export default function BackButton({ href }: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // ✅ go back if possible
    } else if (href) {
      router.push(href); // ✅ fallback
    } else {
      router.push("/"); // ✅ default fallback
    }
  };

  return (
    <button
      onClick={handleBack}
      className="absolute top-4 left-4 z-20 p-2 rounded-full bg-gradientPrimary backdrop-blur-md border border-white/10 hover:scale-105 transition"
    >
      <ArrowLeft className="w-7 h-7 text-white" />
    </button>
  );
}
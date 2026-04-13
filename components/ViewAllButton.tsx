"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "./Loader";

interface Props {
  href: string;
}

export default function ViewAllButton({ href }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return; // prevent double click
    setLoading(true);
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-base text-accentBlue"
    >
      {loading ? (
        <>
          <Loader small />
          Loading...
        </>
      ) : (
        "View all"
      )}
    </button>
  );
}
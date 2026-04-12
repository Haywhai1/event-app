"use client";

import { SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3 mt-4">
      
      {/* SEARCH INPUT */}
      <div
        className="
        flex-1 flex items-center gap-3 px-4 h-12 rounded-2xl
        
        bg-white/5 backdrop-blur-xl
        border border-white/10
        
        shadow-[0_4px_20px_rgba(0,0,0,0.3)]
      "
      >
        <span className="text-gray-400 text-lg">🔍</span>

        <input
          type="text"
          placeholder="Search events..."
          className="
          bg-transparent outline-none text-sm w-full
          placeholder:text-gray-400 text-white
        "
        />
      </div>

      {/* FILTER BUTTON */}
      <button
        className="
        h-12 w-12 rounded-2xl flex items-center justify-center
        
        bg-gradientPrimary backdrop-blur-xl
        border border-white/10
        
        shadow-lg
      "
      >
        <SlidersHorizontal size={18} className="text-white" />
      </button>
    </div>
  );
}
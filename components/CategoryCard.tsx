import React from "react";

interface CategoryProps {
  label: string;
  count: number;
}

export default function CategoryCard({ label, count }: CategoryProps) {
  return (
   <div className="bg-cardBg rounded-xl p-3 text-center border border-white/5">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-[10px] text-grayText mt-1">{count} events</p>
    </div>
  );
}
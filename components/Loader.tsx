"use client";

interface Props {
  small?: boolean;
}

export default function Loader({ small }: Props) {
  return (
    <div
      className={`
        border-2 border-white/30 border-t-white rounded-full animate-spin
        ${small ? "w-4 h-4" : "w-8 h-8"}
      `}
    />
  );
}
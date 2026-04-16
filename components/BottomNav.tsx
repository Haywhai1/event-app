import Link from "next/link";

export default function BottomNav() {
  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-cardBg/80 backdrop-blur-md
        border-t border-white/5
        px-8 py-3
        flex justify-between items-center
        text-xs text-grayText
        will-change-transform
      "
      style={{
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <Link href="/" className="text-white">🏠 Explore</Link>
      <Link href="/calendar">📅</Link>
      <Link href="/tickets">🎟️</Link>
      <Link href="/profile">⚙️</Link>
    </nav>
  );
}
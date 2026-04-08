export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cardBg border-t border-white/5 py-3 px-8 flex justify-between text-xs text-grayText backdrop-blur-lg">
      <a href="/explore" className="text-white">🏠 Explore</a>
      <a href="/calendar">📅</a>
      <a href="/tickets">🎟️</a>
      <a href="/profile">⚙️</a>
    </nav>
  );
}
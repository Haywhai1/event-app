export default function SearchBar() {
  return (
    <div className="w-full bg-cardBg rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/5">
      <span className="text-grayText text-lg">🔍</span>

      <input
        type="text"
        placeholder="Search events..."
        className="bg-transparent outline-none text-base w-full placeholder-grayText"
      />
    </div>
  );
}
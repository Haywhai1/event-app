export default function SearchBar() {
  return (
    <div className="w-full bg-cardBg rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/5">
      <span className="text-grayText text-lg">🔍</span>

      <input
        type="text"
        placeholder="Search events..."
        className="bg-transparent outline-none text-sm w-full placeholder-grayText"
      />

      {/* <button className="text-white bg-white/10 px-3 py-1.5 rounded-xl text-sm">
        ⚙️
      </button> */}
    </div>
  );
}
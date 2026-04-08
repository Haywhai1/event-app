export default function EventCard() {
  return (
    <div
      className="
        relative shrink-0 rounded-2xl overflow-hidden border-4 border-white/100 bg-cover bg-center
        w-56 h-56                 /* mobile size */
        md:w-72 md:h-64           /* medium screens */
        lg:w-96 lg:h-80           /* large screens */
      "
      style={{ backgroundImage: "url('/images/irish.png')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* DATE BADGE */}
      <div className="absolute top-3 right-3 bg-white text-black text-[10px] px-3 py-1 rounded-xl font-medium shadow-sm">
        <p className="font-black text-sm text-center">Oct</p>
        <p className="font-black text-sm text-center">21</p>
      </div>

      {/* INFO */}
      <div className="absolute bottom-3 left-3 text-white">
        <p className="text-[10px] opacity-80">Concert</p>
        <h3 className="text-sm font-semibold leading-tight">Blue Irish</h3>
      </div>
    </div>
  );
}
import Image from "next/image";

export default function EventCard() {
  return (
    <div
      className="
      relative shrink-0 rounded-2xl overflow-hidden

      w-56 h-56
      md:w-72 md:h-64
      lg:w-96 lg:h-80

      bg-white/5 backdrop-blur-xl
      border border-white/10

      shadow-[0_10px_40px_rgba(0,0,0,0.5)]
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]
      hover:scale-[1.02]

      transition-all duration-300
      group
    "
    >
      {/* IMAGE */}
      <Image
        src="/images/irish2.png"
        alt="Event"
        width={200}
        height={200}
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover 
        group-hover:scale-110 transition-transform duration-500 border-4 border-white/100 rounded-2xl"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* GRADIENT FADE */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent" />

      {/* DATE BADGE (UPGRADED) */}
      <div
        className="
        absolute top-3 right-3 z-10
        px-3 py-1.5 rounded-xl

        bg-white/90 backdrop-blur-md
        text-black text-xs font-semibold

        flex flex-col items-center leading-tight
        shadow-md
      "
      >
        <span className="text-[10px] uppercase tracking-wide text-gray-600 ">
          Oct
        </span>
        <span className="text-sm font-bold">21</span>
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-xs text-gray-300">Concert</p>
        <h3 className="text-lg font-semibold text-white leading-tight">
          Blue Irish
        </h3>
      </div>

      {/* GLOW RING */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
    </div>
  );
}
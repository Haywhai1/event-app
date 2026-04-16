export default function GradientBanner() {
  return (
    <div
      className="
        p-10 md:p-20 md:mx-4
        rounded-2xl text-white text-center
        
        bg-gradientPrimary
        
        shadow-md
        will-change-transform
        transform-gpu
      "
    >
      <h3 className="font-semibold text-lg md:text-3xl">
        Claim 3 Free Tickets! 🎉
      </h3>

      <p className="text-base md:text-lg opacity-90 mt-1 mb-4 leading-relaxed">
        Open a premium account and get 3 tickets instantly
      </p>

      <button
        className="
          px-4 py-2 md:px-6 md:py-3 md:text-lg
          bg-white text-black
          rounded-xl md:rounded-2xl
          text-sm font-semibold
          active:scale-95 transition
        "
      >
        Click here
      </button>
    </div>
  );
}
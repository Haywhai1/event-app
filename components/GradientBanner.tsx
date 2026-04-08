export default function GradientBanner() {
  return (
    <div className="p-4 rounded-2xl text-white bg-gradientPrimary shadow-lg">
      <h3 className="font-semibold text-base">Claim 3 Free Tickets! 🎉</h3>

      <p className="text-xs opacity-90 mt-1 mb-4 leading-relaxed">
        Open a premium account and get 3 tickets instantly
      </p>

      <button className="px-4 py-2 bg-white text-black rounded-xl text-xs font-semibold">
        Click here
      </button>
    </div>
  );
}
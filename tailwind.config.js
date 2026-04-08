/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        darkBg: "#0F0E17",
        cardBg: "#1A1A25",
        grayText: "#A3A3A3",
        accentBlue: "#3E6FF4",
      },
      backgroundImage: {
        gradientPrimary: "linear-gradient(90deg, #642DF7, #C438EF)",
      },
    },
  },
  plugins: [],
};
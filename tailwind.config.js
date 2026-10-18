/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: { gold: { DEFAULT: "#f6b93b", soft: "#fbd073", deep: "#b8801a" }, ink: { DEFAULT: "#070707", card: "#0f0e0b" } },
      boxShadow: { gold: "0 0 30px -8px rgba(246,185,59,.45)" },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: { float: "float 6s ease-in-out infinite", spinSlow: "spinSlow 40s linear infinite" },
    },
  },
  plugins: [],
};

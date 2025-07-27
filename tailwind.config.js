// tailwind.config.js
const plugins = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#059669",
        navy: "#1E3A8A",
        slate: "#334155",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "rotate-slow": "rotate 20s linear infinite",
        "gradient-x": "gradient-x 3s ease infinite",
      },
    },
  },
  plugins: [
    plugins(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow": {
          "text-shadow": "2px 2px 8px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-md": {
          "text-shadow": "4px 4px 10px rgba(0, 0, 0, 0.6)",
        },
        ".text-shadow-lg": {
          "text-shadow": "6px 6px 12px rgba(0, 0, 0, 0.7)",
        },
      });
    }),
  ],
};

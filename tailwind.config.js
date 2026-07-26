/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        coral: "#FF6B7A",
        coralsoft: "#FFE4E1",
        cream: "#FFF8F3",
        charcoal: "#2A2A2A",
        mint: "#7FD8BE",
        sunny: "#FFD166",
        fog: "#E8E8EC",
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Playfair Display"', "serif"],
        round: ['"Quicksand"', '"Noto Sans SC"', "sans-serif"],
        sans: ['"Noto Sans SC"', '"Quicksand"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(255, 107, 122, 0.12)",
        card: "0 10px 30px rgba(42, 42, 42, 0.08)",
      },
      keyframes: {
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "cursor-blink": "cursor-blink 0.8s step-end infinite",
      },
    },
  },
  plugins: [],
};

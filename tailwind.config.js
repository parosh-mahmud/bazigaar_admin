/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        blackText: "#222222",
        barColor:
          "linear-gradient(270deg, #0D0D10 0%, rgba(13, 13, 16, 0.30) 100%)",
        black: "#0D0D10",
        chartBar: "blue",
      },

      boxShadow: {
        cardShadow: "2px 5px 10px rgba(0, 0, 0, 0.15)",
        drawShadow: "0px 10px 20px rgba(0, 0, 0, 0.30)",
        userDetailsCardShadow: "2px 5px 10px rgba(0, 0, 0, 0.15)",
        rollingShadow: "0px 4px 12px 3px rgba(0, 0, 0, 0.50) inset;",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1540px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};

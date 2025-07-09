/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#fef9c3", // soft yellow
          DEFAULT: "#facc15", // yellow-400
          dark: "#eab308", // golden yellow
        },
        accent: {
          DEFAULT: "#f59e0b", // orange-400
        },
      },
      fontFamily: {
        display: ['"Poppins"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};


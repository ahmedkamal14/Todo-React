/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#191919",
        secondary: "#1E6F9F",
        secondaryL: "#4EA8DE",
        blackC: "#0d0d0d",
        burbleC: "#8284FA",
        taskBg: "#262626",
        taskBorder: "#333333",
        whiteH: "#D9D9D9",
        whiteG: "#F2F2F2",
      },
    },
  },
  plugins: [],
};

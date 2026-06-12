/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        primary: ['PinyonScript'],
      },

      colors: {

        navy: "#1e3a8a",
        emeraldMid: "#2D7A5C",
        emeraldLight: "#4A9E7A",
        emeraldPale: "#C8DED5",

        deep: "#0f2456",

        cream: "#F8F5EE",
        creamDark: "#EDE8DC",

        gold: "#b8952a",
        goldLight: "#D4B96A",
        goldPale: "#E8D9A8",

        text: "#2C2C2A",
        textMid: "#5A5248",
        textLight: "#9A8E80",

        white: "#FFFFFF",
      }
    },
  },
  plugins: [],
}


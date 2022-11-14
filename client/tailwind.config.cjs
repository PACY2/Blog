/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      background: "#262626",
      "dark-background": "#202020",
      primary: "#f52936",
      white: "#d5d6d6",
      transparent: "rgba(0,0,0,0)",
      "pure-white": "#fff",
      "midtransparent-black-background": "rgba(32, 32, 32,0.4)"
    }
  },
  plugins: [],
}

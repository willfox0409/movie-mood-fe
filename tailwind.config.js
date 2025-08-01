/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bitcount: ['"Bitcount Single"', 'system-ui'],
      },
    },
  },
  plugins: [require("daisyui")],
}
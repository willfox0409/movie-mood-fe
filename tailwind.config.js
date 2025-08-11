/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bitcount: ['"Bitcount Single"', 'system-ui'],
        geo: ['"Geo"', 'sans-serif'],
        sans: ['"Permanent Marker"', 'sans-serif'],
        rubik: ['"Rubik Iso"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
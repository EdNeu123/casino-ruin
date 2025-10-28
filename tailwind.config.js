/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burgundy': '#8b0c26',
        'black-bean': '#391717',
        'chocolate-cosmos-light': '#4f131b',
        'chocolate-cosmos': '#3f0713',
        'dark-purple': '#0b011a',
        'eerie-black': '#151716',
        'onyx': '#33363F',
        'veil': '#00000040',
        'vermilion': '#e14533',
        'wine': '#732731',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}


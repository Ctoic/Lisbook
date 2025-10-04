/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-500': '#10b981',
        'gray-800': '#1f2937',
        'gray-900': '#111827',
        'gray-300': '#d1d5db',
      }
    },
  },
  plugins: [],
}
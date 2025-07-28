// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'pl-blue': '#005eb8',
        'pl-green': '#6abf48',
        'pl-gray-light': '#f5f5f5',
        'pl-gray-dark': '#333333',
      }
    }
  },
  plugins: []
}
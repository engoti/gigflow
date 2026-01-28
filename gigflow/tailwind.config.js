/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        primaryDark: '#4f46e5',
        accent: '#10b981',
        dark: '#0f172a',
        darkAlt: '#1e293b',
        textLight: '#cbd5e1',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary:      '#1400FF',
        dark:         '#0B0B5A',
        'brand-bg':   '#EBF2F9',
        'brand-text': '#252025',
        muted:        '#6B7280',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'ebp-header': '#171717',
        'ebp-cta-green': '#1b991b',
        'ebp-cta-green-earn-font': '#01d676',
        'ebp-background-dark': '#1E1E1E',
        'ebp-cta-red': '#F44336',
        'ebp-text-light': '#FFFFFF',
        'ebp-text-secondary': '#787878',
      }
    },
  },
  plugins: [],
}
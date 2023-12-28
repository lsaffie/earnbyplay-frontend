/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'ebp-header': '#191b19',
        'ebp-cta-green': '#1b991b',
        'ebp-cta-green-earn-font': '#01d676',
        'ebp-background-dark': '#2b2c2b',
        'ebp-cta-red': '#F44336',
        'ebp-text-light': '#FFFFFF',
        'ebp-text-secondary': '#787878',
      }
    },
  },
  plugins: [],
}
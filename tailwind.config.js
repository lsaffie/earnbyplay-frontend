/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'ebp-header': '#171717',
        'ebp-cta-green': '#06a75e',
        'ebp-cta-green-earn-font': '#01d676',
        'ebp-bg-dark': '#1E1E1E',
        'ebp-cta-red': '#F44336',
        'ebp-text-light': '#FFFFFF',
        'ebp-text-secondary': '#787878',
        'ebp-green-border': '#61b272',
        'ebp-paypal-color': '#ffc439',
      },
      fontSize: {
        '2.5xl': '1.70rem', // for example, 20px
      }
    },
  },
  plugins: [],
}
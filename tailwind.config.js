/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    
    extend: {
      colors: {
        'cs-background': '#0b2447',
        'cs-font': '#A5D7E8'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

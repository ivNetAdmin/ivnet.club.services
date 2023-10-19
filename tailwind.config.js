/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    
    extend: {
      colors: {
        'club-background': '#0b2447',
        'text-primary-600': '#A5D7E8'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}





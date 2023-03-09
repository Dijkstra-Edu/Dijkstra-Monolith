/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'bottom': 'bottom',
      },
      colors: {
        'custom-green': '#008000',
        'custom-red': '#C90000'
      },
      width: {
        "device-width": "360px",
      },
      height: {
        "device-height": "640px",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
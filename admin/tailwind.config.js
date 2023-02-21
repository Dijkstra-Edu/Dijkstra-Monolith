/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      },
      colors: {
        'custom-green': '#008000',
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
       brand: {
         100: '#f7f7f7',
         200: '#eaeaea',
         300: '#d9d9d9',
         400: '#bfbfbf',
         500: '#8c8c8c',
         600: '#6b6b6b',
         700: '#4f4f4f',
         800: '#3b3b3b',
         900: '#222222',
       }
      },
    },
  },
  plugins: [],
}


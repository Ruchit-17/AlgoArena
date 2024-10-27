/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': '#121212', 
        'Navbar-dark' : '#1c1c1c',
        'table-dark-1' : '#1c1c1c',
        'table-dark-2' : '#242424',
        'table-head' : '#333333',
        'orange' : '#F4A261',
        'filter' : '#2c2c2c'
      },
    },
  },
  plugins: [],
}


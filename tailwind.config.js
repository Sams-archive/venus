/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        gold: '#D4AF37',
        mauve: '#9E7676',
        charcoal: '#333333',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        parisienne: ['Parisienne', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

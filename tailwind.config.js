/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      animation: {
    'spin-slow': 'spin 5s linear infinite',
      },
      colors: {
        background: "#0F0F0F", // Чуть глубже для акцента лого
        surface: "#181818",    
        border: "#262626",     
        brand: "#5842FF",      // Твой фирменный цвет из логотипа
      },
      borderRadius: {
        'premium': '22px',    
      }
      
    },
  },
  plugins: [],
}
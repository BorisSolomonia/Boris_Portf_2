/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'renaissance-gold': '#D4AF37',
        'renaissance-blue': '#4F6D8E',
        'renaissance-cream': '#F5F5DC',
        'renaissance-brown': '#8B4513',
        'renaissance-green': '#228B22',
      },
      fontFamily: {
        'serif-elegant': ['Playfair Display', 'serif'],
        'sans-elegant': ['Source Sans Pro', 'sans-serif'],
      },
      animation: {
        'lyrical-float': 'lyrical-float 6s ease-in-out infinite',
        'golden-flow': 'golden-flow 8s ease-in-out infinite',
      },
      keyframes: {
        'lyrical-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'golden-flow': {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateX(10px) rotate(2deg)' },
          '66%': { transform: 'translateX(-5px) rotate(-1deg)' },
        }
      }
    },
  },
  plugins: [],
}
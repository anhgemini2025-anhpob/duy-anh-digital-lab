/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050B14',
          900: '#07111E', // Main page background
          850: '#0A192F', // Signature Logo Navy
          800: '#0E223D', // Card background
          750: '#142C4C', // Border / subtle card
          700: '#1A3860',
          600: '#254B7E',
        },
        gold: {
          50: '#FDFBF7',
          100: '#FAF5E9',
          200: '#F3E5C8',
          300: '#E8D09E',
          400: '#E5C384',
          500: '#D4AF37', // Signature Metallic Gold
          600: '#B89225',
          700: '#927118',
        },
        brand: {
          50: '#FAF5E9',
          100: '#F3E5C8',
          200: '#E8D09E',
          300: '#E5C384',
          400: '#D4AF37',
          500: '#C5A028',
          600: '#A38118',
          700: '#826410',
          800: '#0E223D',
          900: '#0A192F',
          950: '#07111E',
        },
        slate: {
          850: '#151e2e',
          900: '#0f172a',
          950: '#090d16',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      aspectRatio: {
        '16/10': '16 / 10',
      }
    },
  },
  plugins: [],
}

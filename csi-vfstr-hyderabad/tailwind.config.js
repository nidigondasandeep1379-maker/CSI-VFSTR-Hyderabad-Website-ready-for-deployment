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
          900: '#070d19',
          850: '#0a1426',
          800: '#0d1b33',
          700: '#13284c',
          600: '#1d3b70',
        },
        primary: {
          50: '#eef8ff',
          100: '#d9f0ff',
          200: '#bce4ff',
          300: '#8ed2ff',
          400: '#58b6ff',
          500: '#1e88e5',
          600: '#0f6cbd',
          700: '#0c5496',
          800: '#0e477d',
          900: '#113c68',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        vignan: {
          red: '#d92525',
          blue: '#134898',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(14, 165, 233, 0.3)',
        'glow-lg': '0 0 40px -10px rgba(14, 165, 233, 0.4)',
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'input-bg': '#333',
        'border-gray': '#555',
        'primary-green': '#4CAF50',
        'primary-green-hover': '#45a049',
        'error-red': '#f44336',
        'text-gray': '#888',
        'warning-orange': '#ff9800',
        'info-blue': '#2196f3',
        'info-blue-hover': '#1976d2',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
} 
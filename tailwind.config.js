/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-navy': '#1a1a2e',
        'input-bg': '#333',
        'border-gray': '#555',
        'primary-green': '#4CAF50',
        'primary-green-hover': '#45a049',
        'error-red': '#f44336',
        'text-gray': '#888',
        'warning-orange': '#ff9800',
        'info-blue': '#2196f3',
        'info-blue-hover': '#1976d2',
        'gold': '#FFD700',
        'cyan-bright': '#00d4ff',
        'purple-light': '#667eea',
        'purple-dark': '#764ba2',
        'white-05': 'rgba(255, 255, 255, 0.05)',
        'white-10': 'rgba(255, 255, 255, 0.1)',
        'white-18': 'rgba(255, 255, 255, 0.18)',
        'white-20': 'rgba(255, 255, 255, 0.2)',
        'white-40': 'rgba(255, 255, 255, 0.4)',
        'black-30': 'rgba(0, 0, 0, 0.3)',
        'black-50': 'rgba(0, 0, 0, 0.5)',
        'blue-shadow': 'rgba(31, 38, 135, 0.37)',
        'cyan-glow': 'rgba(0, 212, 255, 0.5)',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s infinite ease-in-out',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulse: {
          '0%': { opacity: '1', scale: '1' },
          '50%': { opacity: '0.95', scale: '0.95' },
          '100%': { opacity: '1', scale: '1' },
        },
      }
    },
  },
  plugins: [],
} 
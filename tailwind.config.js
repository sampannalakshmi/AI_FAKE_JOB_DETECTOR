/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0e17',
          surface: '#111827',
          card: '#161f30',
          border: '#1f2d42',
          hover: '#24344d',
          accent: '#06b6d4',
          accentGlow: '#0891b2',
        },
        risk: {
          low: '#10b981',
          lowBg: 'rgba(16, 185, 129, 0.1)',
          lowBorder: 'rgba(16, 185, 129, 0.3)',
          medium: '#f59e0b',
          mediumBg: 'rgba(245, 158, 11, 0.1)',
          mediumBorder: 'rgba(245, 158, 11, 0.3)',
          high: '#ef4444',
          highBg: 'rgba(239, 68, 68, 0.1)',
          highBorder: 'rgba(239, 68, 68, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'cyber-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'cyber-red': '0 0 25px -5px rgba(239, 68, 68, 0.3)',
        'cyber-amber': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'cyber-green': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}

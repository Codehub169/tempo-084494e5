/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-background': '#10101a',      // primary-bg from HTML preview
        'theme-surface': '#181828',         // secondary-bg, game-bg from HTML preview
        'theme-controls': '#1f1f30',        // controls-bg from HTML preview
        'theme-primary': '#00f0c0',         // accent-color, snake-color from HTML preview
        'theme-primary-hover': '#00d0a0',   // accent-hover, button-active-bg from HTML preview
        'theme-snake-head': '#32ff7e',      // snake-head-color from HTML preview
        'theme-food': '#ff6b81',            // food-color from HTML preview
        'theme-text': '#e0e0e0',            // text-color from HTML preview
        'theme-text-title': '#ffffff',      // title-color from HTML preview
        'theme-button-text': '#10101a',     // button-text-color from HTML preview
        'theme-danger': '#ff4757',          // danger-color from HTML preview
        'theme-warning': '#FFC107',         // From project plan
        // Original project plan colors for reference
        // 'brand-green': '#4CAF50',
        // 'brand-orange': '#FF9800',
        // 'brand-blue': '#2196F3',
        // 'brand-neutral-dark': '#212121',
        // 'brand-neutral-grid': '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      keyframes: {
        fadeInScaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInScaleUpWithTranslate: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'fade-in-scale-up': 'fadeInScaleUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
        'fade-in-scale-up-translate': 'fadeInScaleUpWithTranslate 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
      },
    },
  },
  plugins: [],
}

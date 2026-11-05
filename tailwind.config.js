/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        ink: '#0C1016',
        base: '#111820',
        card: '#171E27',
        elevate: '#202833',
        cream: '#F5F5F3',
        muted: '#A0A5AB',
        dim: '#666E78',
        orange: '#FF681E',
        ember: '#E94B13',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        tech: ['"Space Grotesk"', 'Inter', 'monospace'],
      },
      letterSpacing: {
        label: '0.28em',
        wide2: '0.16em',
      },
      boxShadow: {
        cinematic: '0 20px 60px rgba(0,0,0,0.45)',
        lift: '0 30px 80px rgba(0,0,0,0.55)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 1100ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1200ms ease-out both',
      },
    },
  },
  plugins: [],
};

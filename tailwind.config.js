/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      colors: {
        glass: {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
          'hover-bg': 'rgba(255, 255, 255, 0.08)',
          'hover-border': 'rgba(255, 255, 255, 0.15)',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.05s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-scale': 'fadeInScale 1.05s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-mask': 'fadeInMask 1.05s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slideInRight 1.05s cubic-bezier(0.16, 1, 0.3, 1) both',
        'count-up': 'countUp 1.05s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pop-in': 'popIn 1.05s cubic-bezier(0.16, 1, 0.3, 1) both',
        'btn-in': 'btnIn 1.05s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          from: { opacity: '0', transform: 'scale(0.84)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        fadeInMask: {
          from: { opacity: '0', transform: 'translateY(40%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(22px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '70%': { transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        btnIn: {
          from: { opacity: '0', transform: 'translateY(18px) scale(0.94)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

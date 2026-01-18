/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1d9ec9',
        'primary-dark': '#157a9c',
        'background-light': '#f7f7f8',
        'background-dark': '#22262a',
        'glass-border': 'rgba(255, 255, 255, 0.6)',
        'glass-surface': 'rgba(255, 255, 255, 0.45)',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        full: '9999px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

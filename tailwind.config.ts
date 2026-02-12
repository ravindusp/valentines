import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ee2b6c',
        'primary-hover': '#d61a5c',
        'bg-light': '#f8f6f6',
        'bg-dark': '#221016',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(238, 43, 108, 0.1)',
        glow: '0 0 20px rgba(238, 43, 108, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;

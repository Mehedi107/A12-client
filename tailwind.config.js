/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#007BFF',
          secondary: '#6B47DC',
          accent: '#FF3B30',
          neutral: '#1C1C2E',
          'base-100': '#F4F4F4',
        },
      },
      'light',
      'dark',
    ],
  },
};

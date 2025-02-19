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
          primary: '#000957',
          secondary: '#344CB7',
          accent: '#577BC1',
          neutral: '#FFEB00',
        },
      },
      'light',
      'dark',
    ],
  },
};

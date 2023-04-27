/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tahiti: {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        pucci: {
          50: '#DBCFD9',
          100: '#9A8296',
          200: '#80637C',
          300: '#5A3454',
          400: '#41153A',
          500: '#34052D',
          600: '#2E0427',
          700: '#270422',
          800: '#21031C',
          900: '#1A0317',
        },
        pucciWhite: '#fff8dc',
      },
    },
  },
  plugins: [],
};

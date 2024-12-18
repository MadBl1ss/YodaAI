/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'accent': '#00FF00',  // Неоновый зелёный
      'pinkneon': '#FF00FF',
      'blueneon': '#00FFFF',
      'purple': '#800080',
      'black': '#000000',
      'white': '#FFFFFF',
      transparent: 'transparent',
    },
    extend: {
      backgroundImage: {
        'banner': "url('/public/banner.png')",
      },
      animation: {
        'hue-rotate': 'hue-rotate 5s linear infinite',
      },
      keyframes: {
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      }
    },
  },
};

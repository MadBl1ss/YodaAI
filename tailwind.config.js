/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'accent': '#ADDE34',
      'dgreen': '#022213',
      'white': "#fff",
      'black': "#000",
      transparent: 'transparent',
    },
    extend: {
      backgroundImage: {
        'banner': "url(/public/banner.png')",
      }
    }
  }
};

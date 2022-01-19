module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gaangPurple: '#8f17f9',
      },
      backgroundImage: {
        'header-background': "url('/backgroundHeader.jpeg')",
      },
    },
  },
  plugins: [],
};

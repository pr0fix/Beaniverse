module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8B6B4A',
          main: '#6F4E37',
          dark: '#5C4130',
        },
        secondary: {
          light: '#D4BC8B',
          main: '#C0A062',
          dark: '#A88B4E',
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
}
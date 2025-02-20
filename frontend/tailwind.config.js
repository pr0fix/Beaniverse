module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FAF8F3", // Off-White
          main: "#2E1E1E", // Deep Espresso
          dark: "#444444", // Charcoal Gray
        },
        secondary: {
          light: "#D4BC8B", // Lighter gold variant
          main: "#C8A97E", // Matte Gold
          dark: "#B39671", // Darker gold variant
        },
        text: {
          primary: "#444444", // Charcoal Gray for main text
          light: "#FAF8F3", // Off-White for text on dark backgrounds
        },
        background: {
          default: "#FAF8F3", // Off-White
          dark: "#2E1E1E", // Deep Espresso
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
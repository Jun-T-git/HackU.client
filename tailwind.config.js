module.exports = {
  mode: "jit", // just-in-timeモード
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#fe133c",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

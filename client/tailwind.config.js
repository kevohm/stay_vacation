/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FFA402",
        green: "#71F28B",
        pink: "#E87FA0",
        darkBlue: "#01315B",
        lightBlue: "#8A9AEA",
      },
    },
  },
  plugins: [],
};

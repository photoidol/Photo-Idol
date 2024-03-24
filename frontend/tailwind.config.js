/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        moonstone: "#00BCD4",
        dark: "#111111",
        pink: "#ff007e",
        whitesmoke: "#F8F8F8",
        ghostwhite: "#f5f5f5",
        slategray: "#677489",
        indigo: "#344767",
        seasalt: "#f8f9fa",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["Open Sans", "sans-serif"],
      },
      screens: {
        tab: { max: "768px" },
        mobile: { max: "412px" },
        xs: "420px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
      },
      boxShadow: {
        shadow1: "0 1px 2px rgba(55,73,87,.1), 0 2px 5px rgba(55,73,87,.15)",
        shadow2: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        default: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        normal: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        auth: "rgba(0, 0, 0, 0.15) 0px 25px 50px -12px",
        button: "rgba(0, 143, 161, 0.4) 0px 7px 20px -1px",
        soft: "0 20px 27px 0 rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
});

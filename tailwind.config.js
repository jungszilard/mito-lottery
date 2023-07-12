/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
    },
    extend: {
      spacing: {
        4.5: "1.125rem" /* 18px */,
        5.5: "1.625rem" /* 22px */,
        8.5: "2.125rem" /* 34px */,
        9.5: "2.375rem" /* 38px */,
        15: "3.75rem" /* 60px */,
        18: "4.5rem" /* 72px */,
      },
      colors: {
        mito: {
          primary: "#020056",
          secondary: "#A5D9C8",
          grad: "#F2F2F2",
          "result-border": "#F6F0C6",
        },
      },
      fontSize: {
        "4.5xl": "2.5rem",
      },
      backgroundImage: {
        "gradien-primary":
          "linear-gradient(270deg, #F6F0C6 0%, #D9135D 0.01%, rgba(214, 19, 92, 1.00) 0.02%, #F6F0C6 0.03%, #A6D9C8 80.73%, #A5D9C8 100%)",
      },
      borderRadius: {
        base: "0.625rem" /* 10px */,
      },
      boxShadow: {
        component: "2px 2px 10px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
}

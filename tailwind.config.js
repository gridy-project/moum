const number0_1000 = { ...Array.from(Array(2001)).map((_, i) => `${i}`) };

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_2000 = { ...Array.from(Array(2001)).map((_, i) => `${i}px`) };

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: px0_2000,
      height: px0_2000,
      borderWidth: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
      left: px0_200,
      right: px0_200,
      top: px0_200,
      bottom: px0_200,
      zIndex: number0_1000,
      padding: px0_200,
      margin: px0_200
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
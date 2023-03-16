/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: colors.black,
    //   white: colors.white,
    //   gray: colors.gray,
    //   emerald: colors.emerald,
    //   indigo: colors.indigo,
    //   yellow: colors.yellow,
    //   slate: colors.slate,
    //   sport: '#FFA600',
    //   politics: '#00E8FF',
    //   world: '#7800FF',
    // },
  },
  plugins: [],
  variants: ["responsive", "group-hover", "hover", "focus"],
}

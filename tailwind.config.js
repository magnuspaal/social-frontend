/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      "colors": {
        "background": "#fff",
        "shade": "#F3F3F3",
        "primary": "#8377D1",
        "secondary": "#53DD6C",
        "tertiary": "#20A4F3"
      },
    },

    fontFamily: {
      'sans': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}

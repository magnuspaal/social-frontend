/** @type {import('tailwindcss').Config} */

import { colors } from "./src/style/colors";

export default {
  content: [
    "./index.html",
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: colors,
      boxShadow: {
        "light": "rgba(0,0,0,0.05) 0px 1px 2px 0px",
        "dark": "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        "up": "rgba(0, 0, 0, 0.08) 0px -1px 8px 4px"
      }
    },
  },
  plugins: [],
}
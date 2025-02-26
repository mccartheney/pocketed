import type { Config } from "tailwindcss";
import daisyui from "daisyui"
import themeNames from "./src/constants/themeNames";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      ...themeNames
    ],
  },
} satisfies Config;

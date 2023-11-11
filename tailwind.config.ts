import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "moderate-blue": "hsl(238, 40%, 52%)",
        "ligh-grayish-blue": " hsl(239, 57%, 85%)",
      },
    },
  },
  plugins: [],
};
export default config;

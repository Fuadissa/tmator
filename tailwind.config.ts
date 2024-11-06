import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        graylight: "rgb(100, 100, 100)",
        graydark: "rgb(72, 72, 72)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)", opacity: "0.2" },
          "50%": { opacity: "0.4" },
          "100%": { transform: "translateX(100%)", opacity: "0.2" },
        },
      },
      animation: {
        shimmer: "shimmer 3s infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/line-clamp")],
};
export default config;

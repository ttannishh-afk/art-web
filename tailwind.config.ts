import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Scans the App Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans your new Components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        // This connects to the fonts we set up in layout.tsx
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
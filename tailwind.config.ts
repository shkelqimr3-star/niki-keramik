import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#181818",
        concrete: "#6f716d",
        stone: "#d7c8af",
        sand: "#efe3d0",
        ceramic: "#f8f7f2",
        water: "#2f8da7",
        clay: "#a56843"
      },
      boxShadow: {
        soft: "0 20px 70px rgba(24, 24, 24, 0.13)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

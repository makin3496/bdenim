import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#141414",
          secondary: "#1a1a1a",
          card: "#1e1e1e",
          modal: "#181818",
        },
        accent: {
          DEFAULT: "#e74c3c",
          hover: "#ff5a49",
        },
        muted: "#888888",
        dim: "#555555",
        border: "#2a2a2a",
        telegram: "#0088cc",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "slide-up": "slideUp 0.4s ease",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        safe: "#10B981",
        warn: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
        brand: "#8B5CF6",
        "navy": "#0F172A",
        "slate-card": "#1E293B",
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.2)",
        "card-hover": "0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -4px rgba(0,0,0,0.3)",
      },
      animation: {
        "pulse-shield": "pulse-shield 3s ease-in-out infinite",
        "scan-line": "scan-line 1.5s ease-in-out infinite",
        "glow-safe": "glow-safe 2s ease-in-out infinite",
        "glow-danger": "glow-danger 1s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
        "spin-slow": "spin-slow 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#05080F",
          panel: "#0A121F",
          raised: "#0F1B2E",
          line: "#1B2A3F",
        },
        cyan: {
          glow: "#22D3EE",
        },
        blue: {
          signal: "#3B82F6",
        },
        green: {
          signal: "#34D399",
        },
        orange: {
          signal: "#FB923C",
        },
        red: {
          alert: "#F43F5E",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "aura-radial":
          "radial-gradient(120% 120% at 50% -10%, rgba(34,211,238,0.14) 0%, rgba(5,8,15,0) 55%)",
        "grid-fade":
          "linear-gradient(180deg, rgba(5,8,15,0) 0%, #05080F 90%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(34,211,238,0.35), 0 0 2px rgba(34,211,238,0.6) inset",
        "glow-orange": "0 0 24px rgba(251,146,60,0.35), 0 0 2px rgba(251,146,60,0.6) inset",
        "glow-green": "0 0 24px rgba(52,211,153,0.35), 0 0 2px rgba(52,211,153,0.6) inset",
        "glow-blue": "0 0 24px rgba(59,130,246,0.35), 0 0 2px rgba(59,130,246,0.6) inset",
        panel: "0 8px 32px rgba(0,0,0,0.45)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.9" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(12px,-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scan: "scan 3.5s linear infinite",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        drift: "drift 8s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

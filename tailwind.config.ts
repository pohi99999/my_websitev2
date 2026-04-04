import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Core dark palette ── */
        dark: "#000000",
        "dark-2": "#050505",
        "dark-surface": "#0a0a0a",
        /* kept for backward compat */
        "dark-indigo": "#050505",

        /* ── Single accent: Cold Electric Cyan ── */
        accent: "#00e5ff",
        "accent-dim": "rgba(0, 229, 255, 0.15)",

        /* ── Text ── */
        "text-primary": "#ffffff",
        "text-secondary": "#a0a0a0",
        "text-muted": "#505050",

        /* ── Legacy aliases → remapped to cyan so existing classes don't break ── */
        "neon-green": "#00e5ff",
        "electric-blue": "#00e5ff",
        /* vibrant-purple removed — any remaining reference falls back to Tailwind default */
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "particle-float": "particleFloat 20s linear infinite",
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "hover-lift": "hoverLift 0.3s ease-out",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "hover-border-glow": "hoverBorderGlow 1.5s infinite alternate",
        "scan-line": "scanLine 4s linear infinite",
        "hud-bracket": "hudBracket 0.4s ease-out forwards",
        "data-stream": "dataStream 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        /* Glow — single cyan accent */
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 229, 255, 0.6)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        particleFloat: {
          "0%": {
            transform: "translateY(100vh) translateX(-10px) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(-100px) translateX(10px) rotate(180deg)",
            opacity: "0",
          },
        },
        /* Neon pulse — cyan */
        neonPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 5px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.4)",
          },
        },
        hoverLift: {
          "0%": { transform: "translateY(0px) scale(1)" },
          "100%": { transform: "translateY(-8px) scale(1.02)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        /* Border glow — cyan */
        hoverBorderGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.3)" },
          "50%": { boxShadow: "0 0 15px rgba(0, 229, 255, 0.8)" },
        },
        /* HUD scan line */
        scanLine: {
          "0%": { transform: "translateY(-100%)", opacity: "0.3" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        /* HUD bracket reveal */
        hudBracket: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        /* HUD data stream pulse */
        dataStream: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
      },
      boxShadow: {
        /* Accent cyan shadows */
        "glow-cyan": "0 0 30px rgba(0, 229, 255, 0.4)",
        "neon-cyan": "0 0 20px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 229, 255, 0.3)",
        /* Legacy aliases remapped to cyan */
        "glow-blue": "0 0 30px rgba(0, 229, 255, 0.4)",
        "glow-green": "0 0 30px rgba(0, 229, 255, 0.4)",
        "neon-green": "0 0 20px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 229, 255, 0.3)",
        "neon-blue": "0 0 20px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 229, 255, 0.3)",
        "inner-glow": "inset 0 0 20px rgba(255, 255, 255, 0.05)",
        "lifted": "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        "card-glow": "0 0 15px rgba(0, 229, 255, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;

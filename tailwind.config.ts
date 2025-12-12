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
        dark: "#000000",
        "dark-indigo": "#0A0A14",
        "electric-blue": "#00FFFF", // Cián/Türkiz
        "vibrant-purple": "#9D00FF", // Vibráló lila
        "text-primary": "#FFFFFF",
        "text-secondary": "#E0E0E0",
        "text-muted": "#A0A0A0",
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
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 157, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 191, 255, 0.6)" },
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
            opacity: "0"
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { 
            transform: "translateY(-100px) translateX(10px) rotate(180deg)",
            opacity: "0"
          },
        },
        neonPulse: {
          "0%, 100%": { 
            boxShadow: "0 0 5px rgba(0, 255, 157, 0.5), 0 0 20px rgba(0, 255, 157, 0.2)" 
          },
          "50%": { 
            boxShadow: "0 0 20px rgba(0, 255, 157, 0.8), 0 0 40px rgba(0, 255, 157, 0.4)" 
          },
        },
        hoverLift: {
          "0%": { transform: "translateY(0px) scale(1)" },
          "100%": { transform: "translateY(-8px) scale(1.02)" },
        },
        gradientShift: {
          "0%, 100%": { 
            backgroundPosition: "0% 50%" 
          },
          "50%": { 
            backgroundPosition: "100% 50%" 
          },
        },
        hoverBorderGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 15px rgba(0, 255, 255, 0.8)" },
        },
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(0, 191, 255, 0.4)",
        "glow-purple": "0 0 30px rgba(147, 51, 234, 0.4)",
        "glow-green": "0 0 30px rgba(0, 255, 157, 0.4)",
        "neon-green": "0 0 20px rgba(0, 255, 157, 0.6), 0 0 40px rgba(0, 255, 157, 0.3)",
        "neon-blue": "0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 191, 255, 0.3)",
        "inner-glow": "inset 0 0 20px rgba(255, 255, 255, 0.1)",
        "lifted": "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        "card-glow": "0 0 15px rgba(0, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

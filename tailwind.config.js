/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        lime: "#D4FF4F",
        warm: "#FAFAFA",
        surface: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["Inter", "Geist", "sans-serif"],
        display: ["Instrument Serif", "serif"],
        mono: ["JetBrains Mono", "Geist Mono", "monospace"],
      },
      fontSize: {
        display: ["clamp(48px, 7vw, 88px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["clamp(36px, 5vw, 64px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(24px, 3vw, 32px)", { lineHeight: "1.2" }],
        h3: ["clamp(20px, 2.5vw, 28px)", { lineHeight: "1.3" }],
        body: ["16px", { lineHeight: "1.6" }],
        mono: ["13px", { lineHeight: "1.7" }],
      },
      spacing: {
        section: "clamp(80px, 10vw, 160px)",
      },
      borderRadius: {
        DEFAULT: "16px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        dust: "dust 15s infinite linear",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        dust: {
          "0%": { transform: "translateY(100vh) translateX(0)", opacity: "0" },
          "20%": { opacity: "0.6" },
          "80%": { opacity: "0.6" },
          "100%": { transform: "translateY(-20vh) translateX(40px)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
import type { Config } from "tailwindcss";

/**
 * Design System — O Segredo Fungi
 * Cores e tokens herdados 1:1 do design system de referência (REFERENCIA 01).
 * Acento lime #D6FF4F mantido conforme pedido do cliente.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",       // true black
        bg: "#0E0F11",        // dark background
        surface: "#15171B",   // surface secondary
        surface2: "#1C1F24",  // surface elevated
        line: "#23252B",      // borders / dividers
        t1: "#F5F5F5",        // light text
        t2: "#A1A1A6",        // tertiary text
        t3: "#52525B",        // placeholder text
        lime: "#D6FF4F",      // accent lime (referência)
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      borderRadius: {
        xl2: "1rem",
      },
      transitionTimingFunction: {
        ds: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      boxShadow: {
        glow: "0 0 22px rgba(214,255,79,0.35)",
        "glow-lg": "0 0 48px rgba(214,255,79,0.45)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 10px rgba(214,255,79,0.25)" },
          "50%": { boxShadow: "0 0 26px rgba(214,255,79,0.55)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0.15" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 28s linear infinite",
        blink: "blink 1.4s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

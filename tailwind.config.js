/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        st: {
          bg:          "#edeae4",   // warm cream — homepage background
          bgsoft:      "#f4f1ec",   // card surfaces
          dark:        "#1a1815",   // near-black text / nav
          text:        "#2a2520",   // body text
          slate:       "#7a7060",   // muted labels
          muted:       "#a09080",   // placeholders
          purple:      "#b8a8c8",   // lavender accent / particles
          purpledim:   "#9a8aaa",   // italic heading accent
          silver:      "#c8d0d8",   // metallic highlight
        },
      },
      fontFamily: {
        fraunces: ["Fraunces", "Georgia", "serif"],
        mono:     ["DM Mono", "Menlo", "monospace"],
      },
      letterSpacing: {
        widest2: "0.22em",
        widest3: "0.30em",
        widest4: "0.38em",
      },
      keyframes: {
        crashDown: {
          "0%":   { transform: "translateY(-130vh)" },
          "74%":  { transform: "translateY(6px)" },
          "83%":  { transform: "translateY(-10px)" },
          "91%":  { transform: "translateY(5px)" },
          "97%":  { transform: "translateY(-2px)" },
          "100%": { transform: "translateY(0)" },
        },
        crashUp: {
          "0%":   { transform: "translateY(130vh)" },
          "74%":  { transform: "translateY(-6px)" },
          "83%":  { transform: "translateY(10px)" },
          "91%":  { transform: "translateY(-5px)" },
          "97%":  { transform: "translateY(2px)" },
          "100%": { transform: "translateY(0)" },
        },
        shockwave: {
          "0%":   { opacity: "0",   transform: "translate(-50%,-50%) scaleX(0) scaleY(1)" },
          "18%":  { opacity: "1",   transform: "translate(-50%,-50%) scaleX(1) scaleY(7)" },
          "65%":  { opacity: "0.4", transform: "translate(-50%,-50%) scaleX(1.05) scaleY(2.5)" },
          "100%": { opacity: "0",   transform: "translate(-50%,-50%) scaleX(1.1) scaleY(1)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scaleY(1)" },
          "50%":      { opacity: "0.9", transform: "scaleY(0.6)" },
        },
      },
      animation: {
        "crash-down":   "crashDown 1.3s cubic-bezier(0.16,1,0.3,1) 0.5s both",
        "crash-up":     "crashUp   1.3s cubic-bezier(0.16,1,0.3,1) 0.5s both",
        "shockwave":    "shockwave 0.55s ease-out 1.77s forwards",
        "fade-up-1":    "fadeUp 0.8s ease-out 2.35s both",
        "fade-up-2":    "fadeUp 0.8s ease-out 2.55s both",
        "fade-up-3":    "fadeUp 0.8s ease-out 2.90s both",
        "marquee":      "marquee 22s linear infinite",
        "scroll-pulse": "scrollPulse 2s ease-in-out 3.5s infinite",
      },
    },
  },
  plugins: [],
};
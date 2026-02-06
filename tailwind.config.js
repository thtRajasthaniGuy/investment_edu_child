/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
      colors: {
        green: {
          50: "#eef9f0",
          100: "#c8e6d0",
          200: "#a0d4ad",
          400: "#4caf72",
          500: "#38a05c",
          600: "#2d8a4e",
          700: "#236b3d",
        },
        blue: {
          50: "#eef4fb",
          100: "#cce0f5",
          200: "#99c3ec",
          400: "#5a9fd4",
          500: "#4a8ec4",
          600: "#3a7ab4",
          700: "#2c5f8a",
        },
        gray: {
          50: "#f8fafa",
          100: "#eef1f1",
          200: "#dde2e2",
          400: "#8c9898",
          500: "#6b7a7a",
          600: "#4a5a5a",
          700: "#2e3e3e",
          800: "#1e2b2b",
        },
        red: {
          400: "#e05555",
          500: "#d04040",
          600: "#b83333",
        },
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.08)",
        md: "0 4px 12px rgba(0,0,0,0.10)",
        lg: "0 8px 28px rgba(0,0,0,0.14)",
        xl: "0 12px 40px rgba(0,0,0,0.18)",
      },
      animation: {
        "toast-slide": "toastSlide 0.3s cubic-bezier(.34,1.56,.64,1) forwards",
        "fade-in": "fadeIn 0.2s ease",
        "scale-in": "scaleIn 0.25s cubic-bezier(.34,1.56,.64,1)",
        "slide-up": "slideUp 0.35s cubic-bezier(.34,1.2,.64,1)",
        "card-in": "cardIn 0.35s cubic-bezier(.34,1.2,.64,1) both",
      },
      keyframes: {
        toastSlide: {
          from: {
            opacity: "0",
            transform: "translateX(-50%) translateY(-20px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(-50%) translateY(0)",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: {
            opacity: "0",
            transform: "scale(0.88)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(24px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        cardIn: {
          from: {
            opacity: "0",
            transform: "translateY(18px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};

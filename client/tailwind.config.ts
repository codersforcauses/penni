import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    {
      // Callouts use format string to determine colour, not rendered if 'jit'
      pattern: /(bg|text|stroke)-penni-(alert|text-regular)/,
    },
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        penni: {
          main: "#0051CA", // penni blue
          "main-shade1": "#AACCFF",
          "main-shade2": "#FAFCFF",
          secondary: "#5A489B",
          alert: {
            warning: "#FFD20C",
            success: "#72D62A",
            error: "#FA4856",
          },
          grey: {
            inactive: "#B6BABC",
            "border-light-mode": "#E7E8E9",
            "border-dark-mode": "#B6BABC",
          },
          background: {
            "light-mode": "#FFFFFF",
            "dark-mode": "#040B17",
          },
          sheet: {
            "light-mode": "#FFFFFF",
            "dark-mode": "#00040C",
          },
          text: {
            "regular-light-mode": "#0B1920",
            "regular-dark-mode": "#FAFAFA",
            "secondary-light-mode": "#485358",
            "secondary-dark-mode": "#BCBCBC",
            "tertiary-light-mode": "#858C8F",
            "tertiary-dark-mode": "#77797D",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderWidth: {
        2: "var(--borderWidth)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "penni-border": "8px",
        "penni-card": "8px",
        "penni-sheet": "8px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

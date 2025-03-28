import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true, // Better performance on mobile
  },
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      screens: {
        'xs': '480px', // Extra small screen breakpoint
      },
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          border: "hsl(var(--border))",
          ring: "hsl(var(--ring))",
          accent: "hsl(var(--accent))",
          "accent-foreground": "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      width: {
        'sidebar-narrow': '14rem',
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
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            transform: "scale(1) rotate(45deg)",
            opacity: "0.3"
          },
          "50%": { 
            transform: "scale(1.2) rotate(45deg)", 
            opacity: "0.5"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite"
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        // 添加荧光阴影效果
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.5)",
        "glow-purple": "0 0 30px rgba(147, 51, 234, 0.5)",
        "glow-green": "0 0 30px rgba(34, 197, 94, 0.5)"
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Add plugin function for reduced motion
    function({ addUtilities, matchUtilities, theme }) {
      const reducedMotionUtilities = {
        '.reduced-motion': {
          '@media (prefers-reduced-motion: reduce)': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
        },
      };
      addUtilities(reducedMotionUtilities);
    },
    function({ addUtilities }) {
      const glowUtilities = {
        // 添加荧光效果的实用类
        ".glow-effect": {
          "@apply transition-all duration-300 ease-in-out": {},
        },
        ".glow-blue": {
          "@apply border-blue-500/30 shadow-glow-blue hover:shadow-glow-blue/70": {},
        },
        ".glow-purple": {
          "@apply border-purple-500/30 shadow-glow-purple hover:shadow-glow-purple/70": {},
        },
        ".glow-green": {
          "@apply border-green-500/30 shadow-glow-green hover:shadow-glow-green/70": {},
        }
      };
      addUtilities(glowUtilities);
    }
  ],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.25s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '25%': {
            transform: 'translateX(-4px)',
          },
          '50%': {
            transform: 'translateX(4px)',
          },
          '75%': {
            transform: 'translateX(-4px)',
          },
        },
      },
      colors: {
        // Primary colors
        primaryBlue: "#1E3A8A", // Dark Blue
        vibrantBlue: "#3B82F6", // Vibrant Blue
        green: "#10B981", // Green
        orange: "#F97316", // Vibrant Orange
        teal: "#14B8A6", // Teal
        purple: "#8B5CF6", // Light Purple
        red: "#EF4444", // Red
        softYellow: "#F59E0B", // Soft Yellow

        // Background and text colors for light and dark modes
        backgroundLight: "#F9FAFB", // Light Background
        backgroundDark: "#111827", // Dark Background
        textDark: "#111827", // Dark Text (for light theme)
        textLight: "#F3F4F6", // Light Text (for dark theme)

        // Chart colors
        chartBlue: "#3B82F6",
        chartGreen: "#10B981",
        chartOrange: "#F97316",
        chartYellow: "#F59E0B",
        chartPurple: "#8B5CF6",
        chartRed: "#EF4444",

        // Using custom CSS variables for theme colors
        background: "var(--background)", // Define custom theme background
        foreground: "var(--foreground)", // Define custom theme foreground

        // Button Colors
        buttonPrimary: "#3B82F6", // Vibrant Blue for primary buttons
        buttonSecondary: "#10B981", // Green for secondary buttons
        buttonDisabled: "#D1D5DB", // Light gray for disabled buttons

        // Button Text Colors
        buttonTextPrimary: "#FFFFFF", // White text on primary buttons
        buttonTextSecondary: "#FFFFFF", // White text on secondary buttons
        buttonTextDisabled: "#6B7280", // Gray text on disabled buttons

        // Select Colors
        selectBackground: "#F3F4F6", // Light background for selects
        selectBackgroundDark: "#1F2937", // Dark background for selects in dark mode
        selectText: "#111827", // Dark text for selects in light mode
        selectTextDark: "#F3F4F6", // Light text for selects in dark mode
        selectBorder: "#D1D5DB", // Border color for selects
        selectBorderDark: "#4B5563", // Dark border color for selects in dark mode
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Default font family
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
} satisfies Config;

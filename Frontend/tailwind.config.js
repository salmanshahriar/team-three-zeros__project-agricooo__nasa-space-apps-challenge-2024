const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            // Change the default colors for the light theme
            background: "#f0f0f0",  // Light background color
            foreground: "#333333",  // Darker foreground text color
            primary: {
              DEFAULT: "#1E90FF",   // New primary blue color
              foreground: "#FFFFFF", // Foreground color for elements using the primary color
            },
            success: "#28a745",      // Change success color
            error: "#FF6347",        // Change error color
            // You can override more colors as needed
          },
        },
        dark: {
          colors: {
            // Change the default colors for the dark theme
            background: "#181818",   // Dark background color
            foreground: "#F5F5F5",   // Lighter foreground text color
            primary: {
              DEFAULT: "#FF6B6B",   // New primary red color for dark mode
              foreground: "#000000", // Foreground color for elements using the primary color
            },
            success: "#81C784",      // Change success color
            error: "#E57373",        // Change error color
          },
        },
        mytheme: {
          extend: "dark",  // Extending from the dark theme
          colors: {
            primary: {
              DEFAULT: "#BEF264",  // Custom green color for primary in the custom theme
              foreground: "#000000",
            },
            focus: "#BEF264",       // Focus color
            // You can define more custom colors here
          },
        },
      },
    }),
  ],
};

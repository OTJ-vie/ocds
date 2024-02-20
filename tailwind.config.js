const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.js',
    './src/**/*.jsx',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'projectImage': "url('/src/assests/project.png')",
        // 'tableImage': "url('/src/assets/table.png')"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          positive: {
            50: "#E8FAF0",
            100: "#D1F4E0",
            200: "#A2E9C1",
            300: "#74DFA2",
            400: "#45D483",
            500: "#17C964",
            600: "#12A150",
            700: "#0E793C",
            800: "#095028",
            900: "#052814",
          }
        },
      },
      dark: {
        colors: {
  
        },
      }
    }
  })]
}


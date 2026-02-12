/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 5s linear infinite'
      },
    
      colors: {
        primary: {
          50: "#004093",

        },
        secondary: {
          50: "#004093",

        },
        tertiary: {
          50: "#26F4FB",
          100:""
        },
        success:{
          100:"#1ACA46"
        }
      }
    }
  },
  plugins: [],
}

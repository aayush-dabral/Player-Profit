module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xsm: "350px",
      sm: "480px",
      md: "567px",
      md2: "600px",
      md3: "650px",
      lg: "769px",
      lg2: "880px",
      xl: "1030px",
      xl1: "1150px",
      xl2: "1200px",
      xl3: "1400px",
    },
    extend: {
      backgroundImage: {},
      colors: {
        green: "rgb(0,152,54)",
        yellow: "#B8E834",
        darkYellow: "#FFBC00",
        darkGreen: "rgb(4,44,17)",
        black: "rgb(0,0,0)",
        lightBlack: "#8B8B8B",
        primaryGray: "#818181",
        white: "rgb(255,255,255)",
        blue: "#070a54",
        lightBlue: "#F6F5FF",
      },
      boxShadow: {},
      fontFamily: {
        sf: "Source Sans, sans-serif",
        sans: ["DM Sans"],
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-up': 'scale-up 0.5s ease-out',
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: {},
    },
  },

  plugins: [require("tailwindcss"), require("autoprefixer")],
  corePlugins: {
    animation: true,
  }
};

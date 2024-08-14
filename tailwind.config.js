/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(240,44%,39%)",
        primaryHover: "hsl(240,44%, 49%)",
        secondary: "hsl(256,31%,40%)",
        secondaryHover: "hsl(256,31%,32%)",
        nav: "hsl(254,35%,25%)",
        msgHover: "hsl(253,35%,12%)",
        chatInput: "hsl(0,0%,23%)",
        time: "rgb(182, 182, 182)",
        sendMsg: "#0b93f6",
        receivedMsg: "rgb(80, 80, 80)",
      },
    },
  },
  plugins: [],
};

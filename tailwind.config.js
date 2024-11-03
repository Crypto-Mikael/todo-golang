import material from "tailwind-material";

export default {
  content: ['./src/**/*.{html,js,svelte,ts,tsx,jsx}'],
  theme: {
    extend: {}
  },
  plugins: [material({ primary: '#262a32'})]
};
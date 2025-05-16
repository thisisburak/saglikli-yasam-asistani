/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,scss}", // HTML, JS ve SCSS dosyalarını tarar
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Popins yazı tipi tanımlandı
      },
    },
  },
  plugins: [],
};

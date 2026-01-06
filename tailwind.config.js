/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // هذا مهم للـ Flowbite JS
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // استخدم plugin بدل import CSS
  ],
}

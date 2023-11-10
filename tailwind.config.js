/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
				"clight": "var(--light)",
				"cdark": "var(--dark)",
				"cmain": "var(--main)",
				"csecond": "var(--second)",
			}
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
  ],
}


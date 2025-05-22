/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/bsr-landing/**/*.{js,ts,jsx,tsx,mdx}", // Scan all relevant files in the bsr-landing directory
    "./app/bsr-landing/components/**/*.{js,ts,jsx,tsx,mdx}", // Be explicit with components too
    // If you have other parts of your app using Tailwind, add their paths here, e.g.:
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can extend the default Tailwind theme here
      // For example, adding custom colors or fonts:
      // colors: {
      //   'brand-blue': '#007ace',
      // },
      // fontFamily: {
      //   sans: ['YourCustomFont', 'sans-serif'],
      // },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
    // require('@tailwindcss/forms'),
  ],
}

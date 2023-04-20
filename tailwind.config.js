/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./node_modules/@honzachalupa/design-system/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
};

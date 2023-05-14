/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./**/*!(node_modules)/*.{js,ts,jsx,tsx}",
        "./node_modules/@honzachalupa/design-system/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
};

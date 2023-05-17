module.exports = {
    extends: ["next/core-web-vitals", "prettier"],
    plugins: ["@typescript-eslint"],
    rules: {
        "react-hooks/exhaustive-deps": "off",
        "react/display-name": "off",
        "@next/next/no-html-link-for-pages": "off",
    },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind scans all files
    theme: {
      extend: {
        colors: {
          gold: "#b88a32",
        },
      },
    },
    plugins: [],
  };
  
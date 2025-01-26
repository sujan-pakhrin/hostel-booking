/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                360: "0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.2)",
            },

            colors: {
                primary: "#9400D3",
                darkPrimary: "#6146cd",
                lightPrimary: "#ad99fe",
                sliver: "#c0c0c0",
                bgbtn: "#f1f1f1",
                bgbtnHover: "#d6d6d6",
            },
            height: {
                'calc-vh-minus': 'calc(100vh - 87px)',
              },
        },
    },

    plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: "#020617",
                surface: "#0f172a",
                primary: "#6366f1",
                secondary: "#ec4899",
                accent: "#06b6d4",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
            },
            backdropBlur: {
                'xs': '2px',
            }
        },
    },
    plugins: [],
}

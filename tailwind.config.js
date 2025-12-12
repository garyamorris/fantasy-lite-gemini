/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    main: 'var(--color-primary-main)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-primary-dark)',
                },
                secondary: {
                    main: 'var(--color-secondary-main)',
                    light: 'var(--color-secondary-light)',
                    dark: 'var(--color-secondary-dark)',
                },
                background: {
                    default: 'var(--color-background-default)',
                    paper: 'var(--color-background-paper)',
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                }
            },
            fontFamily: {
                sans: 'var(--font-sans)',
            }
        },
    },
    plugins: [],
}

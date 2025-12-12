export const tokens = {
    colors: {
        primary: {
            main: '#3b82f6', // blue-500
            light: '#60a5fa', // blue-400
            dark: '#2563eb', // blue-600
        },
        secondary: {
            main: '#8b5cf6', // violet-500
            light: '#a78bfa', // violet-400
            dark: '#7c3aed', // violet-600
        },
        background: {
            default: '#0f172a', // slate-900
            paper: '#1e293b', // slate-800
        },
        text: {
            primary: '#f8fafc', // slate-50
            secondary: '#94a3b8', // slate-400
        },
        accent: {
            success: '#22c55e', // green-500
            warning: '#f59e0b', // amber-500
            error: '#ef4444', // red-500
        }
    },
    typography: {
        fontFamily: {
            sans: '"Inter", sans-serif',
            mono: '"Fira Code", monospace',
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
        }
    },
    spacing: {
        unit: 4, // 4px base unit
    },
    // 3D Specific Tokens
    materials: {
        metalness: 0.5,
        roughness: 0.5,
        emissiveIntensity: 0.2,
    }
}

export type ThemeTokens = typeof tokens;

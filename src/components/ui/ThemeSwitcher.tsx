import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { tokens } from '../../theme/tokens';

export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        // Simple toggle between "Default" (Blue/Violet) and "Fire" (Red/Orange)
        if (theme.colors.primary.main === tokens.colors.primary.main) {
            setTheme({
                ...tokens,
                colors: {
                    ...tokens.colors,
                    primary: { main: '#ef4444', light: '#f87171', dark: '#b91c1c' }, // Red
                    secondary: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' }, // Amber
                }
            });
        } else {
            setTheme(tokens);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded text-xs font-bold border"
            style={{
                borderColor: theme.colors.primary.main,
                color: theme.colors.primary.main
            }}
        >
            Toggle Theme
        </button>
    );
};

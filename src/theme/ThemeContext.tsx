import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokens, ThemeTokens } from './tokens';

interface ThemeContextType {
    theme: ThemeTokens;
    setTheme: (theme: ThemeTokens) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeTokens>(tokens);

    // Sync CSS variables with theme tokens
    useEffect(() => {
        const root = document.documentElement;

        // Colors
        Object.entries(theme.colors).forEach(([category, values]) => {
            Object.entries(values).forEach(([key, value]) => {
                root.style.setProperty(`--color-${category}-${key}`, value);
            });
        });

        // Typography
        root.style.setProperty('--font-sans', theme.typography.fontFamily.sans);

        // Spacing
        root.style.setProperty('--spacing-unit', `${theme.spacing.unit}px`);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

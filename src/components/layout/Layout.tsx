import React from 'react';
import { Navbar } from './Navbar';
import { useTheme } from '../../theme/ThemeContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.colors.background.default, color: theme.colors.text.primary }}>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
};

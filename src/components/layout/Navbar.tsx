import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

export const Navbar: React.FC = () => {
    const { theme } = useTheme();

    return (
        <nav className="border-b border-gray-800 bg-opacity-80 backdrop-blur-md sticky top-0 z-50"
            style={{ backgroundColor: theme.colors.background.paper }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold" style={{ color: theme.colors.primary.main }}>
                            Fantasy Lite
                        </Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:text-white" style={{ color: theme.colors.text.secondary }}>
                                Dashboard
                            </Link>
                            <Link to="/matchup" className="px-3 py-2 rounded-md text-sm font-medium hover:text-white" style={{ color: theme.colors.text.secondary }}>
                                Matchup 3D
                            </Link>
                            <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:text-white" style={{ color: theme.colors.text.secondary }}>
                                Admin
                            </Link>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

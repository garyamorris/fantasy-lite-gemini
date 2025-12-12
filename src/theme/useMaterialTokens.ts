import { useMemo } from 'react';
import { useTheme } from './ThemeContext';
import * as THREE from 'three';

export const useMaterialTokens = () => {
    const { theme } = useTheme();

    return useMemo(() => {
        return {
            primary: new THREE.MeshStandardMaterial({
                color: theme.colors.primary.main,
                roughness: theme.materials.roughness,
                metalness: theme.materials.metalness,
            }),
            secondary: new THREE.MeshStandardMaterial({
                color: theme.colors.secondary.main,
                roughness: theme.materials.roughness,
                metalness: theme.materials.metalness,
            }),
            glass: new THREE.MeshPhysicalMaterial({
                color: theme.colors.background.paper,
                roughness: 0.1,
                metalness: 0.1,
                transmission: 0.9,
                transparent: true,
                opacity: 0.5,
            }),
            // Helper to create a material on the fly
            create: (color: string) => new THREE.MeshStandardMaterial({
                color,
                roughness: theme.materials.roughness,
                metalness: theme.materials.metalness,
            })
        };
    }, [theme]);
};

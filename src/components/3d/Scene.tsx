import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useTheme } from '../../theme/ThemeContext';

interface SceneProps {
    children: React.ReactNode;
}

export const Scene: React.FC<SceneProps> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl relative">
            <Canvas shadows camera={{ position: [0, 10, 20], fov: 50 }}>
                <color attach="background" args={[theme.colors.background.default]} />
                <fog attach="fog" args={[theme.colors.background.default, 10, 50]} />

                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                    {children}

                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.1}
                    />
                </Suspense>
            </Canvas>
            <div className="absolute bottom-4 right-4 text-xs opacity-50 pointer-events-none" style={{ color: theme.colors.text.secondary }}>
                Interactive 3D View
            </div>
        </div>
    );
};

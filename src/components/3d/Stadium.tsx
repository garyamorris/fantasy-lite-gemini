import React from 'react';
import { useMaterialTokens } from '../../theme/useMaterialTokens';

export const Stadium: React.FC = () => {
    const materials = useMaterialTokens();

    return (
        <group>
            {/* Field */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 100]} />
                <meshStandardMaterial color="#10b981" roughness={0.8} />
            </mesh>

            {/* Field Lines (Simple) */}
            <gridHelper args={[100, 10, 0xffffff, 0xffffff]} position={[0, 0.1, 0]} rotation={[0, 0, 0]} />

            {/* Stands/Walls */}
            <mesh position={[-26, 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[2, 4, 100]} />
                <primitive object={materials.secondary} />
            </mesh>
            <mesh position={[26, 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[2, 4, 100]} />
                <primitive object={materials.secondary} />
            </mesh>
        </group>
    );
};

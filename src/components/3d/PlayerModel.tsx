import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMaterialTokens } from '../../theme/useMaterialTokens';
import * as THREE from 'three';

interface PlayerModelProps {
    position: [number, number, number];
    color?: string;
    isHome?: boolean;
}

export const PlayerModel: React.FC<PlayerModelProps> = ({ position, color, isHome }) => {
    const materials = useMaterialTokens();
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Idle animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    const material = color ? materials.create(color) : (isHome ? materials.primary : materials.secondary);

    return (
        <group ref={groupRef} position={position}>
            {/* Body */}
            <mesh position={[0, 1, 0]} castShadow>
                <capsuleGeometry args={[0.4, 1, 4, 8]} />
                <primitive object={material} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 1.8, 0]} castShadow>
                <sphereGeometry args={[0.3]} />
                <meshStandardMaterial color="#fbbf24" />
            </mesh>

            {/* Shadow Blob */}
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.4]} />
                <meshBasicMaterial color="#000000" opacity={0.3} transparent />
            </mesh>
        </group>
    );
};

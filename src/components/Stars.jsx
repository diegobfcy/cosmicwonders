// src/components/Stars.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Stars() {
  const starsRef = useRef();

  const positions = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5000; i++) {
      positions.push((Math.random() - 0.5) * 2000); // X
      positions.push((Math.random() - 0.5) * 2000); // Y
      positions.push((Math.random() - 0.5) * 2000); // Z
    }
    return new Float32Array(positions);
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.5}
        sizeAttenuation
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
}

export default Stars;
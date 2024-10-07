import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LogoLetras from "./../assets/LogoLetras.png";
import './transitionStyles.css';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressProvider';


function Stars() {
  const ref = useRef();

  const [positions] = useState(() => {
    const positions = [];
    const starCount = 12000;
    const minDistance = 1000;
    const maxDistance = 2000;

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius =
        minDistance + Math.random() * (maxDistance - minDistance);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = -radius * Math.cos(phi) + 500; // Estrellas detrás de la cámara

      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  });

  useFrame(() => {
    ref.current.rotation.y += 0.0005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xffffff}
        size={3}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function InitialPage() {
  const { advanceProgress } = useProgress();
    const navigate = useNavigate(); // Now it should work without error
  
    const handleStartClick = () => {
      advanceProgress(); // Navigate to the scenes page
      navigate("/scenes");
    };
  
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000000' }}>
        <Canvas
          camera={{ position: [0, 0, 500], fov: 75 }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Stars />
          <OrbitControls enableZoom={false} />
        </Canvas>
        <img
          src={LogoLetras}
          alt="Logo Image"
          style={{
            position: 'absolute',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            width: '35%',
            height: 'auto',
            pointerEvents: 'none',
          }}
        />
        <button
          style={{
            position: 'absolute',
            bottom: '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            width: '200px',
            height: '60px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '2px solid white',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            fontFamily: 'Michroma, sans-serif',
          }}
          onClick={handleStartClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            e.target.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.target.style.color = 'white';
          }}
        >
          Start
        </button>
      </div>
    );
}

  
  export default InitialPage;
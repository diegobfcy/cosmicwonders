import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TypeAnimation } from 'react-type-animation'; // Importa TypeAnimation
import './transitionStyles.css';
import { useNavigate } from 'react-router-dom';

import Logo from './../assets/logo.png';
import Scene1 from './../assets/escena1.png';
import Scene2 from './../assets/escena2.png';
import Scene3 from './../assets/escena3.png';
import Scene4 from './../assets/escena4.png';
import { useProgress } from '../context/ProgressProvider';

const scenes = [Scene1, Scene2, Scene3, Scene4];
const texts = [
  'Nova: How many planets are out there? I wish I could visit them!',
  'Nova: What is this?',
  'Nova: A diary... from Grandpa Orion...',
  'Nova: Wow!',
];

function InitialScenesPage() {
  const { advanceProgress } = useProgress();
  const [currentScene, setCurrentScene] = useState(0);
  const [inProp, setInProp] = useState(true);
  const navigate = useNavigate(); // Instancia de useNavigate
  const transitionDuration = 1500;

  useEffect(() => {
    scenes.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleNext = () => {
    if (!inProp) return;

    setInProp(false);

    setTimeout(() => {
      if (currentScene === scenes.length - 1) {
        advanceProgress(); 
        navigate("/orion");
      } else {
        const newSceneIndex = (currentScene + 1) % scenes.length;
        setCurrentScene(newSceneIndex);
        setInProp(true);
      }
    }, transitionDuration);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <CSSTransition
        in={inProp}
        timeout={transitionDuration}
        classNames="fade"
        unmountOnExit
      >
        <div>
          <img
            src={scenes[currentScene]}
            alt={`Scene ${currentScene + 1}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px 40px',
              borderRadius: '10px',
              zIndex: 2,
            }}
          >
            <TypeAnimation
              key={currentScene} // Asegúrate de que la key cambia con cada escena
              sequence={[
                texts[currentScene], // Texto de la escena actual
                500000,               // Duración para mantener el texto visible después de escribirse
                ' '                 // Espacio para evitar el error de undefined
              ]}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              style={{
                color: 'white',
                fontFamily: 'Michroma, sans-serif',
                fontSize: '24px',
                textAlign: 'center',
                margin: 0,
              }}
            />
          </div>
        </div>
      </CSSTransition>

      <img
        src={Logo}
        alt="Logo"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '100px',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          cursor: (!inProp ? 'not-allowed' : 'pointer'),
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          opacity: (!inProp ? 0.5 : 1),
        }}
        onClick={handleNext}
      >
        <p
          style={{
            color: 'white',
            fontFamily: 'Michroma, sans-serif',
            fontSize: '20px',
            marginRight: '10px',
          }}
        >
          Next
        </p>
        <span
          style={{
            display: 'inline-block',
            width: '0',
            height: '0',
            borderLeft: '10px solid white',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
          }}
        ></span>
      </div>
    </div>
  );
}

export default InitialScenesPage;
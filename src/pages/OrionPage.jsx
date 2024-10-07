// OrionPage.jsx
import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { TypeAnimation } from "react-type-animation";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./OrionPage.css";
import Stars from "../components/Stars";

import AlcubierreModel from "./../assets/models/Alcubierre.glb";
import ChungFreeseModel from "./../assets/models/Chung-Freese.glb";
import SolitonesModel from "./../assets/models/Solitones.glb";

import AlcubierreImage from "./../assets/AlcubieraPresentation.png";
import ChungFreeseImage from "./../assets/Freese-XPresentation.png";
import SolitonesImage from "./../assets/LentziumPresentation.png";
import FondoPlaneta1 from "./../assets/FondoPlaneta1.webp";
import FondoPlaneta2 from "./../assets/FondoPlaneta2.webp";
import FondoPlaneta3 from "./../assets/FondoPlaneta3.webp";
import FondoPlaneta4 from "./../assets/FondoPlaneta4.webp";


const ShipModel = ({ modelPath, scale }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Ajusta la velocidad de rotación aquí
    }
  });

  return <primitive object={scene} scale={scale} ref={ref} />;
};

const OrionPage = () => {
  const [part, setPart] = useState(1);
  const [selectedShip, setSelectedShip] = useState(null);
  const [inProp, setInProp] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleNext = () => {
    if (part === 2 && !selectedShip) return;
    setInProp(false);
    setTimeout(() => {
      setPart((current) => (current === 3 ? 1 : current + 1));
      setInProp(true);
    }, 500);
  };

  const handleBack = () => {
    setInProp(false);
    setTimeout(() => {
      setPart((current) => (current === 1 ? 3 : current - 1));
      setInProp(true);
    }, 500);
  };

  const handleShipSelect = (ship) => {
    if (selectedShip === ship) {
      setSelectedShip(null);
    } else {
      setSelectedShip(ship);
    }
    console.log(selectedShip);
  };

  const handleLearnMore = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div className="orion-page">
      <TransitionGroup component={null}>
        <CSSTransition key={part} timeout={1500} classNames="fade">
          <div className="part-container">
            {part === 1 && (
              <div className="text-container">
                <TypeAnimation
                  sequence={[
                    "Orion: “Today I reflect on the vast universe and the incredible diversity of worlds I have been fortunate to explore.\n\nRecently, I've been following the advances of NASA's exoplanet exploration program, an effort dedicated to discovering and studying these fascinating worlds beyond our solar system. Topics like the habitable zone and exoplanets excite me greatly. I notice that every star in the sky shines with the promise of a new discovery. Undoubtedly, exoplanets are worlds full of possibilities. I love learning something new about them every day.”",
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={0}
                  style={{
                    fontSize: "1.5rem",
                    whiteSpace: "pre-wrap",
                    color: "white",
                  }}
                />
              </div>
            )}

            {part === 2 && (
              <div className="canvas-container">
                <Canvas
                  camera={{ position: [0, 0, 500], fov: 75 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Stars />
                  <OrbitControls enableZoom={false} />
                </Canvas>
                <div className="title-container">
                  <h1>Choose a spaceship for Orion</h1>
                  <p>
                    "The ships are based on theories or models that could enable
                    journeys to exoplanets."
                  </p>
                </div>
                <div className="buttons-container">
                  <button
                    className={`ship-button ${
                      selectedShip === "Alcubierre" ? "selected" : ""
                    } ${
                      selectedShip && selectedShip !== "Alcubierre"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => handleShipSelect("Alcubierre")} style={{
                      fontFamily: "Michroma, sans-serif",
                    }}
                  >
                    <div className="checkbox">
                      {selectedShip === "Alcubierre" && <span>&#10003;</span>}
                    </div>
                    <h2>Alcubiera</h2>
                    <Canvas className="model-canvas">
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <ShipModel modelPath={AlcubierreModel} scale={0.06} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                    <p>
                      A theoretical concept for faster-than-light travel using
                      spacetime manipulation.
                    </p>
                    <button
                      className="learn-more-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(AlcubierreImage);
                      }} style={{
                        fontFamily: "Michroma, sans-serif",
                      }}
                    >
                      Learn More
                    </button>
                  </button>
                  <button
                    className={`ship-button ${
                      selectedShip === "Chung-Freese" ? "selected" : ""
                    } ${
                      selectedShip && selectedShip !== "Chung-Freese"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => handleShipSelect("Chung-Freese")}style={{
                      fontFamily: "Michroma, sans-serif",
                    }}
                  >
                    <div className="checkbox">
                      {selectedShip === "Chung-Freese" && <span>&#10003;</span>}
                    </div>
                    <h2>Freese-X</h2>
                    <Canvas className="model-canvas">
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <ShipModel modelPath={ChungFreeseModel} scale={0.01} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                    <p>
                      A model based on the theoretical concept of traversable
                      wormholes.
                    </p>
                    <button
                      className="learn-more-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(ChungFreeseImage);
                      }}style={{
                        fontFamily: "Michroma, sans-serif",
                      }}
                    >
                      Learn More
                    </button>
                  </button>
                  <button
                    className={`ship-button ${
                      selectedShip === "Solitones" ? "selected" : ""
                    } ${
                      selectedShip && selectedShip !== "Solitones"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => handleShipSelect("Solitones")}
                  >
                    <div className="checkbox">
                      {selectedShip === "Solitones" && <span>&#10003;</span>}
                    </div>
                    <h2 style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>Lentzium</h2>
                    <Canvas className="model-canvas">
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <ShipModel modelPath={SolitonesModel} scale={0.015} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                    <p style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>
                      A concept utilizing soliton waves for propulsion across
                      interstellar distances.
                    </p>
                    <button
                      className="learn-more-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(SolitonesImage);
                      }} style={{
                        fontFamily: "Michroma, sans-serif",
                      }}
                    >
                      Learn More
                    </button>
                  </button>
                </div>
              </div>
            )}

            {part === 3 && (
              <div className="canvas-container">
                <Canvas
                  camera={{ position: [0, 0, 500], fov: 75 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Stars />
                  <OrbitControls enableZoom={false} />
                </Canvas>
                <div className="title-container">
                  <h1 style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>
                    Choose the first type of exoplanet you want to explore
                  </h1>
                  <p style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>
                    Explore various planetary types that might harbor conditions
                    for life beyond Earth.
                  </p>
                </div>
                <div className="buttons-container">
                  <button
                    className="planet-button"
                    style={{ backgroundImage: `url(${FondoPlaneta1})` }}
                  >
                    <div className="overlay">
                      <h1 style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>Gas giant</h1>
                      <p style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>
                        These exoplanets are huge and made mostly of gases like
                        hydrogen and helium, just like Jupiter and Saturn in our
                        solar system. They don't have a solid surface, so you
                        couldn't stand on them. They are often found very close
                        to their stars or very far away.
                      </p >
                      <button style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>Explore</button>
                    </div>
                  </button>
                  <button
                    className="planet-button"
                    style={{ backgroundImage: `url(${FondoPlaneta2})` }}
                  >
                    <div className="overlay">
                      <h1 style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>Neptunian</h1>
                      <p style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>
                        These exoplanets are similar to Neptune. They're smaller
                        than gas giants but larger than Earth. They have thick
                        atmospheres made of hydrogen, helium, and water, along
                        with other gases. They can be quite hot depending on how
                        close they are to their star.
                      </p>
                      <button style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>Explore</button>
                    </div>
                  </button>
                  <button
                    className="planet-button"
                    style={{ backgroundImage: `url(${FondoPlaneta3})` }}
                  >
                    <div className="overlay">
                      <h1 style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>Super-Earth</h1>
                      <p style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>
                        Super-Earths are rocky planets like Earth, but they are
                        bigger. They can be up to 10 times more massive than
                        Earth. Some might have thick atmospheres, oceans, or
                        even conditions suitable for life, but others might be
                        dry and barren.
                      </p>
                      <button style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>Explore</button>
                    </div>
                  </button>
                  <button
                    className="planet-button"
                    style={{ backgroundImage: `url(${FondoPlaneta4})` }}
                  >
                    <div className="overlay">
                      <h1
                        style={{
                          fontFamily: "Michroma, sans-serif",
                        }}
                      >
                        Terrestrial
                      </h1>
                      <p                         style={{
                          fontFamily: "Michroma, sans-serif",
                        }}>
                        These are rocky exoplanets similar to Earth or Mars.
                        They are smaller and have solid surfaces you could
                        potentially walk on. Terrestrial exoplanets might have
                        atmospheres and possibly water, which are important for
                        life as we know it.
                      </p>
                      <button                         style={{
                          fontFamily: "Michroma, sans-serif",
                        }} >Explore</button>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>

      <div
        className="next-button-orion"
        onClick={handleNext}
        style={{
          opacity: part === 2 && !selectedShip ? 0.5 : 1,
          pointerEvents: part === 2 && !selectedShip ? "none" : "auto",
        }}
      >
        <p>Next</p>
        <span className="arrow-right"></span>
      </div>
      <div className="back-button" onClick={handleBack}>
        <span className="arrow-left"></span>
        <p>Back</p>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Ship" />
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
      
    </div>
    
  );
};

export default OrionPage;

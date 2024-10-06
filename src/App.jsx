import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InitialPage from './pages/InitialPage';
import InitialScenesPage from './pages/InitialScenesPage';
import './App.css'; // Archivo CSS para las animaciones
import OrionPage from './pages/OrionPage';

function App() {
  const location = useLocation(); // Obtener la ubicación actual para la animación de rutas

  return (
    <div style={{ backgroundColor:'black' }}>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={1000}>
          <Routes location={location}>
            <Route path="/" element={<InitialPage />} />
            <Route path="/scenes" element={<InitialScenesPage />} />
            <Route path="/orion" element={<OrionPage/>}/>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
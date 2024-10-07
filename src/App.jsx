// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InitialPage from './pages/InitialPage';
import InitialScenesPage from './pages/InitialScenesPage';
import OrionPage from './pages/OrionPage';
import './App.css'; 
import { ProgressProvider } from './context/ProgressProvider';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();

  return (
    <div style={{ backgroundColor: 'black' }}>
      <TransitionGroup>
      <ProgressProvider>
        <CSSTransition key={location.key} classNames="fade" timeout={1000}>
          <Routes location={location}>
            <Route path="/" element={<InitialPage />} />
            <Route 
              path="/scenes" 
              element={
                <PrivateRoute stage={1}>
                  <InitialScenesPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/orion" 
              element={
                <PrivateRoute stage={2}>
                  <OrionPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </CSSTransition>
        </ProgressProvider>
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
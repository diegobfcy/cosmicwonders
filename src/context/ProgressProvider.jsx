import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext({});

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0); // Representa la última ruta accesible (por número de etapa)

  const advanceProgress = () => setProgress(prev => prev + 1);

  return (
    <ProgressContext.Provider value={{ progress, advanceProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);

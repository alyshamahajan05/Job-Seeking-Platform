import React, { StrictMode, createContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorised, setIsAuthorised, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);

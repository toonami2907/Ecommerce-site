// StateProvider.jsx
import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [hide, setHide] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <StateContext.Provider value={{ hide, setHide, token}}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a StateProvider');
  }
  return context;
};

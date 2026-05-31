import { createContext, useContext, useState } from 'react';
import type React from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavContextType {
  activePath: string;
  setActivePath: (path: string) => void;
  registerPageSwitch: (callback: (path: string) => void) => void;
  handleNavClick: (path: string) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize with current location, but allow override
  const [activePath, setActivePathState] = useState(location.pathname);
  
  // Sync activePath with location.pathname
  if (activePath !== location.pathname) {
    setActivePathState(location.pathname);
  }

  const setActivePath = (path: string) => {
    setActivePathState(path);
    // Optionally update URL without navigation if needed, or rely on router
    // But for OnePage scroll, we might want URL to stay clean or match section
  };


  const handleNavClick = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <NavContext.Provider value={{ activePath, setActivePath, registerPageSwitch: () => {}, handleNavClick }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
};

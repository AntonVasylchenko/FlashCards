import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import router from './Routes.tsx';
import './tailwind.css'
import useTranslation from './hook/useTranslation.ts';


type LocalesContextType = {
  t: (key: string) => string;
  language_code: string;
  changeLanguage: (lang: string) => void;
};

export const LocalesContext = React.createContext<LocalesContextType>({
  t: (key) => key, 
  language_code: 'en',
  changeLanguage: () => {},
});

export const LocalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, language_code, changeLanguage } = useTranslation()

  return (
    <LocalesContext.Provider value={{ t, language_code, changeLanguage }}>
      {children}
    </LocalesContext.Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <LocalesProvider>
    <RouterProvider router={router} />
  </LocalesProvider>
);

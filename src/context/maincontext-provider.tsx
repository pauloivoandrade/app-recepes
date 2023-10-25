import { useState } from 'react';
import MainContext from './maincontext-context';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [isMeals, setIsMeals] = useState(true);
  return (
    <MainContext.Provider
      value={ {
        isMeals,
        setIsMeals,
      } }
    >
      {children}
    </MainContext.Provider>
  );
}

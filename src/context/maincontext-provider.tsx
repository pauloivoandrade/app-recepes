import { useState } from 'react';
import MainContext from './maincontext-context';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [recipeFetch, setRecipeFetch] = useState([]);
  return (
    <MainContext.Provider
      value={ {
        recipeFetch,
        setRecipeFetch,
      } }
    >
      {children}
    </MainContext.Provider>
  );
}

import MainContext from './maincontext-context';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <MainContext.Provider
      value={ {} }
    >
      {children}
    </MainContext.Provider>
  );
}

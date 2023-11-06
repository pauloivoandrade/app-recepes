import { useState, useCallback } from 'react';
import { RecipesContextType } from '../types/contextType';
import MainContext from './maincontext-context';
import { DrinkType, MealType } from '../types/index';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [recipeFetch, setRecipeFetch] = useState<DrinkType[] | MealType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateLoading = useCallback((parameter: boolean) => setLoading(parameter), []);

  const updateRecipesList = useCallback((newList: DrinkType[] | MealType[]) => {
    setRecipeFetch(newList);
  }, []);

  const contextValue: RecipesContextType = {
    recipeFetch,
    setRecipeFetch,
    updateRecipesList,
    updateLoading,
    loading,
  };

  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  );
}

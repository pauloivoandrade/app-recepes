import { DrinkType, MealType } from './index';

export type RecipesContextType = {
  recipeFetch: DrinkType[] | MealType[],
  setRecipeFetch: React.Dispatch<React.SetStateAction<DrinkType[] | MealType[]>>,
  updateRecipesList: (newList: DrinkType[] | MealType[]) => void,
  updateLoading: (parameter: boolean) => void,
  loading: boolean,
};

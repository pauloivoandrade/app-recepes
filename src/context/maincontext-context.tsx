import { createContext } from 'react';
import { RecipesContextType } from '../types/contextType';

const MainContext = createContext({} as RecipesContextType);

export default MainContext;

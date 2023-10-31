import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { mealsCategories, mealsFetch12, mealsFetchByCategory } from '../services/apiFood';
import { RecipesCard } from './RecipesCard';
import MainContext from '../context/maincontext-context';
import { drinksCategories, drinksFetch12, drinksFetchByCategory }
  from '../services/apiDrinks';
import '../css/Recipes.css';

export function Recipes() {
  const { recipeFetch, setRecipeFetch } = useContext(MainContext);

  const { pathname } = useLocation();
  const isMeals = pathname.includes('/meals');

  const [categories, setCategories] = useState([]);
  const [recipeByCategory, setRecipeByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const mealFetch = useCallback(async () => {
    const response = await mealsFetch12();
    setRecipeFetch(response);
  }, [setRecipeFetch]);

  const drinkFetch = useCallback(async () => {
    const response = await drinksFetch12();
    setRecipeFetch(response);
  }, [setRecipeFetch]);

  const mealsCategoriesFetch = useCallback(async () => {
    const response = await mealsCategories();
    setCategories(response);
  }, [setCategories]);

  const drinksCategoriesFetch = useCallback(async () => {
    const response = await drinksCategories();
    setCategories(response);
  }, [setCategories]);

  useEffect(() => {
    if (isMeals) {
      mealFetch();
      mealsCategoriesFetch();
    } else {
      drinkFetch();
      drinksCategoriesFetch();
    }
  }, [isMeals, mealFetch, mealsCategoriesFetch, drinkFetch, drinksCategoriesFetch]);

  const handleCategory = async (category: string) => {
    if (isMeals) {
      if (category !== selectedCategory) {
        const response = await mealsFetchByCategory(category);
        setRecipeByCategory(response);
        console.log('recipe 5:', response);
        setSelectedCategory(category);
      } else {
        const response = await mealsFetch12();
        setRecipeByCategory(response);
        console.log('recipe 12:', response);
        setSelectedCategory('All');
      }
    } else if (category !== selectedCategory) {
      const response = await drinksFetchByCategory(category);
      setRecipeByCategory(response);
      setSelectedCategory(category);
    } else {
      const response = await drinksFetch12();
      setRecipeByCategory(response);
      setSelectedCategory('All');
    }
  };

  const handleAllBtn = async () => {
    setRecipeByCategory([]);
    setSelectedCategory('All');
  };

  return (
    <div className="div1">
      <div>
        <p className="div2">
          { categories.map((element: any, index: number) => (
            <button
              key={ index }
              data-testid={ `${element.strCategory}-category-filter` }
              type="button"
              onClick={ () => handleCategory(element.strCategory) }
            >
              {element.strCategory}
            </button>
          )) }
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ () => handleAllBtn() }
          >
            All
          </button>
        </p>
        <h1>
          { recipeByCategory.length > 0 ? recipeByCategory
            .map((element: any, index: number) => (
              <RecipesCard
                key={ index }
                index={ index }
                recipe={ element }
              />
            )) : recipeFetch.map((element: any, index: number) => (
              <RecipesCard
                key={ index }
                index={ index }
                recipe={ element }
              />
          )) }
        </h1>
      </div>
    </div>
  );
}

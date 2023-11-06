import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../types/index';
import MainContext from '../context/maincontext-context';
import IngredientList from './IngredientList';
import ShareButton from './ShareButton';
import HeartButton from './HeartButton';

function RecipeInProgress() {
  const { loading, updateLoading } = useContext(MainContext);
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const [recipeData, setRecipeData] = useState<DrinkType | MealType>(
    {} as DrinkType | MealType,
  );

  useEffect(() => {
    const isMeals = pathname.includes('/meals');
    let fetchFunction;

    if (isMeals) {
      fetchFunction = async () => {
        updateLoading(false);
        const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const mealsJson = await meals.json();
        setRecipeData(mealsJson.meals[0]);
        updateLoading(false);
      };
    } else {
      fetchFunction = async () => {
        const drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const drinksJson = await drinks.json();
        setRecipeData(drinksJson.drinks[0]);
        updateLoading(false);
      };
    }

    fetchFunction();
  }, [id, pathname, updateLoading]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1 data-testid="recipe-title">
        { recipeData.strMeal || recipeData.strDrink }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipeData.strMealThumb || recipeData.strDrinkThumb }
        alt="recipe"
      />
      {recipeData.strCategory && (
        <p data-testid="recipe-category">
          { recipeData.strCategory }
        </p>
      )}
      {recipeData.strAlcoholic && (
        <p data-testid="recipe-category">
          { recipeData.strAlcoholic }
        </p>
      )}
      <IngredientList recipesData={ recipeData } />
      <p data-testid="instructions">
        { recipeData.strInstructions }
      </p>
      {pathname.includes('meals') && recipeData.strYoutube && (
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${recipeData.strYoutube.split('=')[1]}` }
          title="YouTube video player"
          allowFullScreen
        />
      )}
      <ShareButton />
      <HeartButton recipeDetail={ recipeData } />
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </>
  );
}

export default RecipeInProgress;

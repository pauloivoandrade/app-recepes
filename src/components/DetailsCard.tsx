import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export function DetailsCard() {
  const { pathname } = useLocation();
  const { recipeID } = useParams();
  const isMeals = pathname.includes('/meals');

  const [recipeDetail, setRecipesDetail] = useState<any | null>(null);

  useEffect(() => {
    let fetchFunction;

    if (isMeals) {
      fetchFunction = async () => {
        const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
        const mealsJson = await meals.json();
        setRecipesDetail(mealsJson.meals[0]);
      };
    } else {
      fetchFunction = async () => {
        const drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
        const drinksJson = await drinks.json();
        setRecipesDetail(drinksJson.drinks[0]);
      };
    }

    fetchFunction();
  }, [isMeals, recipeID]);

  if (!recipeDetail) {
    return <div>Loading...</div>;
  }

  const ingredients: string[] = Object.entries(recipeDetail)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([value]) => value);

  const measures: string[] = Object.entries(recipeDetail)
    .filter(([key, value]) => key.startsWith('strMeasure') && value)
    .map(([value]) => value);

  return (
    <div>
      {isMeals ? (
        <div>
          <img
            data-testid="recipe-photo"
            src={ recipeDetail.strMealThumb }
            alt={ recipeDetail.strMeal }
          />
          <h1 data-testid="recipe-title">{recipeDetail.strMeal}</h1>
          <h1 data-testid="recipe-category">{recipeDetail.strCategory}</h1>

          <h2>Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <React.Fragment key={ index }>
                <li data-testid={ `${index}-ingredient-name-and-measure` }>
                  {measures[index]}
                  {' '}
                  {ingredient}
                </li>
              </React.Fragment>
            ))}
          </ul>

          <h2>Instructions:</h2>
          <p data-testid="instructions">{recipeDetail.strInstructions}</p>

          <h2>Video:</h2>
          <iframe
            data-testid="video"
            src={ recipeDetail.strYoutube.replace('watch?v=', 'embed/') }
            width="640"
            height="360"
            frameBorder="0"
            allowFullScreen
            title="Embedded Video"
          />
        </div>
      ) : (
        <div>
          <img
            data-testid="recipe-photo"
            src={ recipeDetail.strDrinkThumb }
            alt={ recipeDetail.strDrink }
          />
          <h1 data-testid="recipe-title">{recipeDetail.strDrink}</h1>
          <h1 data-testid="recipe-category">{recipeDetail.strAlcoholic}</h1>

          <h2>Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <React.Fragment key={ index }>
                <li data-testid={ `${index}-ingredient-name-and-measure` }>
                  {measures[index]}
                  {' '}
                  {ingredient}
                </li>
              </React.Fragment>
            ))}
          </ul>

          <h2>Instructions:</h2>
          <p data-testid="instructions">{recipeDetail.strInstructions}</p>

          <h2>Video:</h2>
          <iframe
            data-testid="video"
            width="640"
            height="360"
            frameBorder="0"
            allowFullScreen
            src={ recipeDetail.strVideo
              ? recipeDetail.strVideo.replace('watch?v=', 'embed/')
              : 'no video vailable' }
            title="Embedded Video"
          />
        </div>
      )}
    </div>
  );
}

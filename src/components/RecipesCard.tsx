import { useContext } from 'react';
import MainContext from '../context/maincontext-context';

export function RecipesCard(index: any, recipe: any) {
  const { isMeals } = useContext(MainContext);
  const { strMealThumb, strDrinkThumb, strMeal, strDrink } = recipe;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ isMeals ? strMealThumb : strDrinkThumb }
        alt={ isMeals ? strMeal : strDrink }
      />
      <p data-testid={ `${index}-card-name` }>
        {isMeals ? strMeal : strDrink}
      </p>
    </div>
  );
}

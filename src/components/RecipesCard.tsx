import { Link, useLocation } from 'react-router-dom';
import '../css/recipesCard.css';

export function RecipesCard({ index, recipe }: { index: number, recipe: any }) {
  const { strMealThumb, strDrinkThumb, strMeal, strDrink, idMeal, idDrink } = recipe;

  const { pathname } = useLocation();
  const isMeals = pathname.includes('/meals');

  return (
    <Link
      className="FoodCard"
      to={ isMeals ? `/meals/${idMeal}` : `/drinks/${idDrink}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <p data-testid={ `${index}-card-name` } className="pFC">
          {isMeals ? strMeal : strDrink}
        </p>
        <img
          className="imgFC"
          data-testid={ `${index}-card-img` }
          src={ isMeals ? strMealThumb : strDrinkThumb }
          alt={ isMeals ? strMeal : strDrink }
        />

      </div>
    </Link>
  );
}

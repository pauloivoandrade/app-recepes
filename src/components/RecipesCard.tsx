import { Link, useLocation } from 'react-router-dom';

export function RecipesCard({ index, recipe }: { index: number, recipe: any }) {
  const { strMealThumb, strDrinkThumb, strMeal, strDrink, idMeal, idDrink } = recipe;

  const { pathname } = useLocation();
  const isMeals = pathname.includes('/meals');

  return (
    <Link
      to={ isMeals ? `/meals/${idMeal}` : `/drinks/${idDrink}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <p data-testid={ `${index}-card-name` }>
          {isMeals ? strMeal : strDrink}
        </p>
        <img
          data-testid={ `${index}-card-img` }
          src={ isMeals ? strMealThumb : strDrinkThumb }
          alt={ isMeals ? strMeal : strDrink }
        />
      </div>
    </Link>
  );
}

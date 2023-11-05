import { useState } from 'react';
import { useLocation } from 'react-router-dom';

type IngredientProps = {
  index: number,
  product: string,
  ingredient: string,
  ingredientId: string,
};

export default function IngredientCard({
  index,
  ingredientId,
  ingredient,
  product,
}: IngredientProps) {
  const { pathname } = useLocation();

  const [finished, setFinished] = useState<boolean>(false);

  if (pathname.includes('in-progress')) {
    return (
      <>
        <label
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          style={ {
            textDecoration: finished ? 'line-through solid rgb(0, 0, 0)' : 'none',
          } }
        >
          <input
            type="checkbox"
            id={ ingredient }
            checked={ finished }
            onChange={ () => setFinished(!finished) }
          />
          {`${ingredient} - ${ingredientId}`}

        </label>
        <br />
      </>
    );
  }

  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ product }
    >
      { `${ingredient} - ${ingredientId}` }
    </li>
  );
}

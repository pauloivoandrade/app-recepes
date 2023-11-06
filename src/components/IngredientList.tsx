import React from 'react';
import { IngredientsListType } from '../types/index';
import IngredientCard from './IngredientCard';

function IngredientList({ recipesData }: IngredientsListType) {
  const ingredients = Object.keys(recipesData).filter(
    (product) => product.includes('strIngredient') && recipesData[product],
  );

  const measurement = Object.keys(recipesData).filter(
    (measure) => measure.includes('strMeasure') && recipesData[measure],
  );

  return (
    <ul>
      {ingredients.map((product, index) => {
        const ingredient = recipesData[product];
        const ingredientId = recipesData[measurement[index]];
        return (
          <IngredientCard
            key={ ingredient }
            index={ index }
            product={ product }
            ingredient={ ingredient }
            ingredientId={ ingredientId }
          />
        );
      })}
    </ul>
  );
}

export default IngredientList;

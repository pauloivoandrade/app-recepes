import React, { useState, useEffect } from 'react';
import { getFromStorage, setOnStorage } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import HeartButton from './HeartButton';

function InProgress({ isMeals }: any) {
  const [checkedIngredients, setCheckedIngredients] = useState(() => {
    const savedIngredients = getFromStorage('checkedIngredients');
    return savedIngredients || Array(20).fill(false);
  });
  const [copied, setCopied] = useState(false);
  const handleCopyToClipboard = async () => {
    const link = window.location.href;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (error) {
      console.error('Erro ao copiar o link: ', error);
    }
  };

  useEffect(() => {
    setOnStorage('checkedIngredients', checkedIngredients);
  }, [checkedIngredients]);

  const handleIngredientToggle = (index: any) => {
    const updatedIngredients = [...checkedIngredients];
    updatedIngredients[index] = !updatedIngredients[index];
    setCheckedIngredients(updatedIngredients);
  };

  const recipeDetail = getFromStorage('recipeDetail');
  if (!recipeDetail) {
    return <div>Dados da receita não encontrados.</div>;
  }

  return (
    <div>
      <HeartButton />
      <button
        style={ {
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding: 0,
        } }
        onClick={ handleCopyToClipboard }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Ícone de compartilhamento"
          style={ { width: '50px', height: '50px' } }
        />
      </button>

      {copied && <p data-testid="copied-message">Link copied!</p>}
      <img
        data-testid="recipe-photo"
        src={ recipeDetail.strMealThumb || recipeDetail.strDrinkThumb }
        alt={ isMeals ? recipeDetail.strMeal : recipeDetail.strDrink }
      />
      <h1 data-testid="recipe-title">
        {isMeals ? recipeDetail.strMeal : recipeDetail.strDrink}

      </h1>
      <h1 data-testid="recipe-category">
        {isMeals ? recipeDetail.strCategory : recipeDetail.strAlcoholic}

      </h1>

      <h2>Ingredients:</h2>
      <ul>
        {Array.from({ length: 20 }, (_, index) => index).map((index) => {
          const measure = recipeDetail[`strMeasure${index}`];
          const ingredient = recipeDetail[`strIngredient${index}`];
          if (measure && ingredient) {
            return (
              <li key={ index }>
                <label>
                  <input
                    type="checkbox"
                    checked={ checkedIngredients[index] }
                    onChange={ () => handleIngredientToggle(index) }
                  />
                  {measure}
                  {' '}
                  {ingredient}
                </label>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <h2>Instructions:</h2>
      <p data-testid="instructions">{recipeDetail.strInstructions}</p>

      <button>
        Finish Recipe
      </button>
    </div>
  );
}
export default InProgress;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setOnStorage, getFromStorage } from '../services/useLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function HeartButton({ recipeDetail }: any) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();
  const isMeals = pathname.includes('/meals');

  useEffect(() => {
    const favoriteRecipes = getFromStorage('favoriteRecipes') || [];
    const isAlreadyFavorite = favoriteRecipes
      .some((item: any) => item.id === (recipeDetail.idMeal || recipeDetail.idDrink));
    setIsFavorite(isAlreadyFavorite);
  }, [recipeDetail]);

  const saveToFavorites = () => {
    // [{ id, type, nationality, category, alcoholicOrNot, name, image }]
    const favRecipe = {
      id: recipeDetail.idMeal || recipeDetail.idDrink,
      type: isMeals ? 'meal' : 'drink',
      nationality: recipeDetail.strArea || '',
      category: recipeDetail.strCategory,
      alcoholicOrNot: isMeals ? '' : recipeDetail.strAlcoholic,
      name: recipeDetail.strMeal || recipeDetail.strDrink,
      image: recipeDetail.strMealThumb || recipeDetail.strDrinkThumb,
    };

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isAlreadyFavorite = favoriteRecipes
      .some((item: any) => item.id === favRecipe.id);

    if (isAlreadyFavorite) {
      const updatedFavorites = favoriteRecipes
        .filter((item: any) => item.id !== favRecipe.id);
      setOnStorage('favoriteRecipes', updatedFavorites);
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favoriteRecipes, favRecipe];
      setOnStorage('favoriteRecipes', updatedFavorites);
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={ saveToFavorites }
      style={ {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
      } }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Heart Icon"
        style={ { width: '30px', height: '30px' } }
      />
    </button>
  );
}

export default HeartButton;

import React, { useState, useEffect } from 'react';
import { setOnStorage } from '../services/localStorage';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function HeartButton({ recipeDetail }: any) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isAlreadyFavorite = favoriteRecipes
      .some((item: any) => item.id === recipeDetail.id);

    setIsFavorite(isAlreadyFavorite);
  }, [recipeDetail.id]);

  const saveToFavorites = () => {
    const favRecipe = {
      id: recipeDetail.id,
      name: recipeDetail.name,
      category: recipeDetail.category,
      image: recipeDetail.image,
      instructions: recipeDetail.instructions,
      ingredients: recipeDetail.ingredients,
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
      data-testid="favorite-btn"
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
        src={ isFavorite ? blackHeart : whiteHeart }
        alt="Heart Icon"
        style={ { width: '30px', height: '30px' } }
      />
    </button>
  );
}

export default HeartButton;

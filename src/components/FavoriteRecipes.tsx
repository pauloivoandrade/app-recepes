import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import favIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export function FavoriteRecipes() {
  const { host, protocol } = window.location;
  const [clipText, setClipText] = useState(false);
  const [favsArray, setFavsArray] = useState<any>([]);

  useEffect(() => {
    setFavsArray(JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'));
  }, []);

  const handleFavorite = (id: string) => {
    const newFavsArray = favsArray.filter((recipe: any) => recipe.id !== id);
    setFavsArray(newFavsArray);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavsArray));
  };

  const handleMeals = () => {
    const meals = favsArray.filter((recipe: any) => recipe.type === 'meal');
    setFavsArray(meals);
  };

  const handleDrinks = () => {
    const drinks = favsArray.filter((recipe: any) => recipe.type === 'drink');
    setFavsArray(drinks);
  };

  const handleClipboard = (id: string, type: string) => {
    setClipText(true);
    navigator.clipboard.writeText(`${protocol}//${host}/${type}s/${id}`);
    setTimeout(() => setClipText(false), 3000);
  };

  return (
    <>
      <p>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleMeals() }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleDrinks() }
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFavsArray(JSON.parse(localStorage.getItem('favoriteRecipes')
           || '[]')) }
        >
          All
        </button>
      </p>
      <div>
        {favsArray.length > 0 ? favsArray.map((recipe: any, index: number) => (
          <div key={ recipe.name }>
            <Link
              to={ recipe.type === 'meal'
                ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <img
                style={ { width: '100px' } }
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
            </p>
            <button
              onClick={ () => handleClipboard(recipe.id, recipe.type) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
              />
              { clipText && <p>Link copied!</p> }
            </button>
            <button
              onClick={ () => handleFavorite(recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ favIcon }
                alt="favorite"
              />
            </button>
          </div>
        ))
          : 'Nenhuma receita favoritada'}
      </div>
    </>
  );
}

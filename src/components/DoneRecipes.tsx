import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../context/maincontext-context';

interface DoneRecipe {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
}

export function DoneRecipes() {
  const { recipeFetch } = useContext(MainContext);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [filter, setFilter] = useState<'all' | 'meal' | 'drink'>('all');

  useEffect(() => {
    const doneRecipesFromLocalStorage = localStorage.getItem('doneRecipes');
    if (doneRecipesFromLocalStorage) {
      setDoneRecipes(JSON.parse(doneRecipesFromLocalStorage));
    }
  }, []);

  const handleFilterAll = () => setFilter('all');
  const handleFilterMeals = () => setFilter('meal');
  const handleFilterDrinks = () => setFilter('drink');

  const filteredRecipes = doneRecipes.filter((recipe) => {
    if (filter === 'all') return true;
    return recipe.type === filter;
  });

  return (
    <div>
      <h1 data-testid="page-title">Done Recipes</h1>
      <button data-testid="filter-by-all-btn" onClick={ handleFilterAll }>Todos</button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ handleFilterMeals }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterDrinks }
      >
        Drinks

      </button>
      <div>
        {filteredRecipes.map((recipe, index) => (
          <div key={ recipe.id } data-testid={ `recipe-${index}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.nationality}
              {' '}
              -
              {' '}
              {recipe.category}
              {' '}
              {recipe.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done Date:
              {' '}
              {recipe.doneDate}
            </p>
            <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
            {recipe.tags.map((tag, tagIndex) => (
              <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

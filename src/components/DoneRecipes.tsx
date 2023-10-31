import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/maincontext-context';
import shareIcon from '../images/shareIcon.svg';

type DoneRecipe = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
};

export function DoneRecipes() {
  // const { recipeFetch } = useContext(MainContext);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [filter, setFilter] = useState<'all' | 'meal' | 'drink'>('all');
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const navigate = useNavigate();

  const goToRecipeDetail = (id: string, type: 'meal' | 'drink') => {
    navigate(`/${type}s/${id}`);
  };

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

  const handleShare = (id: string, type: 'meal' | 'drink') => {
    const url = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
      })
      .catch((err) => console.error('Error copying link: ', err));
  };

  return (
    <div>
      <button data-testid="filter-by-all-btn" onClick={ handleFilterAll }>All</button>
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
          <div key={ recipe.id } data-testid={ `${index}-horizontal-recipe` }>

            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt=" "
                data-testid={ `${index}-horizontal-image` }
                style={ { cursor: 'pointer', maxWidth: '100%' } }

              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink'
                ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <button
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => goToRecipeDetail(recipe.id, recipe.type) }
            >
              {recipe.name}
            </button>

            <p data-testid={ `${index}-horizontal-done-date` }>
              Done Date:
              {' '}
              {recipe.doneDate}
            </p>
            <button
              onClick={ () => handleShare(recipe.id, recipe.type) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share"
              />
            </button>

            {isLinkCopied && <p>Link copied!</p>}
            {recipe.tags && recipe.tags.slice(0, 2).map((tag, tagIndex) => (
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

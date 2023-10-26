import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  fetchFoodIngredientsData,
  fetchFoodNameData,
  fetchFoodFirstLetter,
} from '../services/apiFood';
import {
  fetchDrinkIngredientsData,
  fetchDrinkNameData,
  fetchDrinkFirstLetter,
} from '../services/apiDrinks';

interface SearchBarProps {
  searchContext: 'food' | 'drink';
}

function SearchBar({ searchContext }: SearchBarProps) {
  const navigate = useNavigate();

  const [searchType,
    setSearchType] = useState<'ingredient' | 'name' | 'first-letter'>('ingredient');
  const [searchValue, setSearchValue] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearchTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as 'ingredient' | 'name' | 'first-letter');
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    let data;

    switch (searchType) {
      case 'ingredient':
        data = searchContext === 'drink'
          ? await fetchDrinkIngredientsData(searchValue)
          : await fetchFoodIngredientsData(searchValue);
        break;

      case 'name':
        data = searchContext === 'drink'
          ? await fetchDrinkNameData(searchValue)
          : await fetchFoodNameData(searchValue);
        break;

      case 'first-letter':
        if (searchValue.length !== 1) {
          window.alert('Your search must have only 1 (one) character');
          return;
        }
        data = searchContext === 'drink'
          ? await fetchDrinkFirstLetter(searchValue)
          : await fetchFoodFirstLetter(searchValue);
        break;

      default:
        break;
    }
    const results = searchContext === 'drink' ? data.drinks : data.meals;

    if (results && results.length === 1) {
      if (searchContext === 'drink') {
        navigate(`/drinks/${results[0].idDrink}`);
      } else if (searchContext === 'food') {
        navigate(`/meals/${results[0].idMeal}`);
      }
    } else if (results && results.length > 1) {
      setRecipes(results.slice(0, 12));
    } else {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        value={ searchValue }
        onChange={ handleSearchInputChange }
      />
      <div className="search-options">
        <label>
          <input
            type="radio"
            name="search-type"
            value="ingredient"
            data-testid="ingredient-search-radio"
            checked={ searchType === 'ingredient' }
            onChange={ handleSearchTypeChange }
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            name="search-type"
            value="name"
            data-testid="name-search-radio"
            checked={ searchType === 'name' }
            onChange={ handleSearchTypeChange }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name="search-type"
            value="first-letter"
            data-testid="first-letter-search-radio"
            checked={ searchType === 'first-letter' }
            onChange={ handleSearchTypeChange }
          />
          First Letter
        </label>
      </div>
      <button data-testid="exec-search-btn" onClick={ handleSearch }>
        Search
      </button>
      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <img
              src={
                searchContext === 'drink' ? recipe.strDrinkThumb : recipe.strMealThumb
}
              alt={ searchContext === 'drink' ? recipe.strDrink : recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {searchContext === 'drink' ? recipe.strDrink : recipe.strMeal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;

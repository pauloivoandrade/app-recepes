import { useState, ChangeEvent, useContext } from 'react';
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
import MainContext from '../context/maincontext-context';

interface SearchBarProps {
  searchContext: 'food' | 'drink';
}

function SearchBar({ searchContext }: SearchBarProps) {
  const navigate = useNavigate();
  const { setRecipeFetch } = useContext(MainContext);

  const [searchType,
    setSearchType] = useState<'ingredient' | 'name' | 'first-letter'>('ingredient');
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as 'ingredient' | 'name' | 'first-letter');
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  async function fetchDataBasedOnSearch() {
    switch (searchType) {
      case 'ingredient':
        return searchContext === 'drink'
          ? fetchDrinkIngredientsData(searchValue)
          : fetchFoodIngredientsData(searchValue);

      case 'name':
        return searchContext === 'drink'
          ? fetchDrinkNameData(searchValue)
          : fetchFoodNameData(searchValue);

      case 'first-letter':
        if (searchValue.length !== 1) {
          window.alert('Your search must have only 1 (one) character');
          return null;
        }
        return searchContext === 'drink'
          ? fetchDrinkFirstLetter(searchValue)
          : fetchFoodFirstLetter(searchValue);

      default:
        return null;
    }
  }

  async function handleSearch() {
    const data = await fetchDataBasedOnSearch();
    if (!data) return;

    const results = searchContext === 'drink' ? data.drinks : data.meals;

    if (results && results.length === 1) {
      if (searchContext === 'drink') {
        navigate(`/drinks/${results[0].idDrink}`);
      } else if (searchContext === 'food') {
        navigate(`/meals/${results[0].idMeal}`);
      }
    } else if (results && results.length > 1) {
      setRecipeFetch(results.slice(0, 12));
    } else {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

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
    </div>
  );
}

export default SearchBar;

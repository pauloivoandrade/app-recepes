import React, { useState, ChangeEvent } from 'react';
import {
  fetchFoodIngredientsData,
  fetchFoodNameData,
  fetchFoodFirstLetter } from '../services/apiFood';

function SearchBar() {
  const [searchType,
    setSearchType] = useState<'ingredient' | 'name' | 'first-letter'>('ingredient');
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as 'ingredient' | 'name' | 'first-letter');
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    if (searchType === 'ingredient') {
      const ingredientData = await fetchFoodIngredientsData(searchValue);
      console.log(ingredientData);
    } else if (searchType === 'name') {
      const nomeData = await fetchFoodNameData(searchValue);
      console.log(nomeData);
    } else if (searchType === 'first-letter') {
      if (searchValue.length === 1) {
        const letterData = await fetchFoodFirstLetter(searchValue);
        console.log(letterData);
      } else {
        window.alert('Your search must have only 1 (one) character');
      }
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
    </div>
  );
}

export default SearchBar;

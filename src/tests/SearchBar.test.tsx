import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import jest from 'jest-mock';
import SearchBar from '../components/SearchBar';
import * as apiFood from '../services/apiFood';
import * as apiDrinks from '../services/apiDrinks';

interface SearchBarProps {
  searchContext: 'food' | 'drink';
}
const SEARCH_INPUT_TEST_ID = 'search-input';
const INGREDIENT_RADIO_TEST_ID = 'ingredient-search-radio';
const NAME_RADIO_TEST_ID = 'name-search-radio';
const FIRST_LETTER_RADIO_TEST_ID = 'first-letter-search-radio';
const EXEX_SEARCH_BTN_TEST = 'exec-search-btn';
const MOCK_IMG = 'mockImg.jpg';

const renderSearchBar = (props: SearchBarProps) => {
  return render(
    <MemoryRouter>
      <SearchBar { ...props } />
    </MemoryRouter>,
  );
};
describe('<SearchBar />', () => {
  it('navigates to the correct route if a single recipe is found', async () => {
    jest.spyOn(apiFood, 'fetchFoodNameData').mockResolvedValueOnce({ meals: [{ idMeal: '1234', strMeal: 'Pizza', strMealThumb: 'img.jpg' }] });
    renderSearchBar({ searchContext: 'food' });
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'Pizza' } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
  });

  it('displays an alert if first-letter search has more than one character', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderSearchBar({ searchContext: 'food' });
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.click(firstLetterRadio);
    fireEvent.change(searchInput, { target: { value: 'ab' } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    alertSpy.mockRestore();
  });

  it('alerts the user when no recipes are found', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(apiFood, 'fetchFoodNameData').mockResolvedValueOnce({ meals: null });
    renderSearchBar({ searchContext: 'food' });
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'NonExistentDish' } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(alertSpy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    alertSpy.mockRestore();
  });

  it('navigates to the correct route for drinks when a single recipe is found', async () => {
    jest.spyOn(apiDrinks, 'fetchDrinkNameData').mockResolvedValueOnce({ drinks: [{ idDrink: '5678', strDrink: 'Cocktail', strDrinkThumb: 'img.jpg' }] });
    renderSearchBar({ searchContext: 'drink' });
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'Cocktail' } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
  });

  it('sets searchType state to ingredient when ingredient radio button is clicked', () => {
    renderSearchBar({ searchContext: 'food' });
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO_TEST_ID);
    fireEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
  });

  it('displays an alert for invalid search input', async () => {
    renderSearchBar({ searchContext: 'food' });
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'P' } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
  });

  // Testes compartilhados para pesquisa por ingredientes e primeira letra
  describe('Shared ingredient and first letter search tests', () => {
    it('fetches food data when search type is ingredient', async () => {
      const mockFoodData = {
        meals: [{ idMeal: '12345', strMeal: 'Pasta', strMealThumb: MOCK_IMG }],
      };
      jest.spyOn(apiFood, 'fetchFoodIngredientsData').mockResolvedValueOnce(mockFoodData);
      renderSearchBar({ searchContext: 'food' });
      const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO_TEST_ID);
      const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
      const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
      fireEvent.click(ingredientRadio);
      fireEvent.change(searchInput, { target: { value: 'Tomato' } });
      await act(async () => {
        fireEvent.click(searchButton);
      });
      expect(apiFood.fetchFoodIngredientsData).toHaveBeenCalledWith('Tomato');
    });

    it('fetches drink data when search type is ingredient', async () => {
      const mockDrinkData = {
        drinks: [{ idDrink: '67890', strDrink: 'Mojito', strDrinkThumb: MOCK_IMG }],
      };
      jest.spyOn(apiDrinks, 'fetchDrinkIngredientsData').mockResolvedValueOnce(mockDrinkData);
      renderSearchBar({ searchContext: 'drink' });
      const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO_TEST_ID);
      const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
      const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
      fireEvent.click(ingredientRadio);
      fireEvent.change(searchInput, { target: { value: 'Mint' } });
      await act(async () => {
        fireEvent.click(searchButton);
      });
      expect(apiDrinks.fetchDrinkIngredientsData).toHaveBeenCalledWith('Mint');
    });

    it('fetches food data when search type is first letter', async () => {
      const mockFoodData = {
        meals: [{ idMeal: '12345', strMeal: 'Pasta', strMealThumb: MOCK_IMG }],
      };
      jest.spyOn(apiFood, 'fetchFoodFirstLetter').mockResolvedValueOnce(mockFoodData);
      renderSearchBar({ searchContext: 'food' });
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
      const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
      const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
      fireEvent.click(firstLetterRadio);
      fireEvent.change(searchInput, { target: { value: 'P' } });
      await act(async () => {
        fireEvent.click(searchButton);
      });
      expect(apiFood.fetchFoodFirstLetter).toHaveBeenCalledWith('P');
    });

    it('fetches drink data when search type is first letter', async () => {
      const mockDrinkData = {
        drinks: [{ idDrink: '67890', strDrink: 'Mojito', strDrinkThumb: MOCK_IMG }],
      };
      jest.spyOn(apiDrinks, 'fetchDrinkFirstLetter').mockResolvedValueOnce(mockDrinkData);
      renderSearchBar({ searchContext: 'drink' });
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
      const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
      const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
      fireEvent.click(firstLetterRadio);
      fireEvent.change(searchInput, { target: { value: 'M' } });
      await act(async () => {
        fireEvent.click(searchButton);
      });
      expect(apiDrinks.fetchDrinkFirstLetter).toHaveBeenCalledWith('M');
    });

    it('fetches drink data when searchType is "first-letter" and context is "drink"', async () => {
      const mockFetch = jest.spyOn(apiDrinks, 'fetchDrinkFirstLetter').mockResolvedValueOnce({ drinks: [] });
      render(<MemoryRouter><SearchBar searchContext="drink" /></MemoryRouter>);
      fireEvent.change(screen.getByTestId(SEARCH_INPUT_TEST_ID), { target: { value: 'm' } });
      fireEvent.click(screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID));
      await act(async () => {
        fireEvent.click(screen.getByTestId(EXEX_SEARCH_BTN_TEST));
      });
      expect(mockFetch).toHaveBeenCalledWith('m');
    });

    it('returns null when searchType is default case', async () => {
      render(<MemoryRouter><SearchBar searchContext="food" /></MemoryRouter>);
      fireEvent.change(screen.getByTestId(SEARCH_INPUT_TEST_ID), { target: { value: 'm' } });
      await act(async () => {
        fireEvent.click(screen.getByTestId(EXEX_SEARCH_BTN_TEST));
      });
    });
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import jest from 'jest-mock';
import SearchBar from '../components/SearchBar';
import * as apiFood from '../services/apiFood';
import * as apiDrinks from '../services/apiDrinks';

const SEARCH_INPUT_TEST_ID = 'search-input';
const INGREDIENT_RADIO_TEST_ID = 'ingredient-search-radio';
const NAME_RADIO_TEST_ID = 'name-search-radio';
const FIRST_LETTER_RADIO_TEST_ID = 'first-letter-search-radio';
const EXEX_SEARCH_BTN_TEST = 'exec-search-btn';
const EXEC_SEARCH_BUTTON_TEST_ID = 'exec-search-button';

describe('<SearchBar />', () => {
  it('renders search input and radio buttons correctly', () => {
    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO_TEST_ID);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    expect(searchInput).toHaveAttribute('type', 'text');
    expect(ingredientRadio).toHaveAttribute('type', 'radio');
    expect(nameRadio).toHaveAttribute('type', 'radio');
    expect(firstLetterRadio).toHaveAttribute('type', 'radio');
  });

  it('updates searchType state when radio buttons are clicked', () => {
    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO_TEST_ID);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);

    fireEvent.click(nameRadio);
    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    fireEvent.click(firstLetterRadio);
    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).toBeChecked();
  });

  it('updates searchValue state when input changes', () => {
    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    fireEvent.change(searchInput, { target: { value: 'apple' } });

    expect(searchInput).toHaveValue('apple');
  });

  it('navigates to the correct route if a single recipe is found', async () => {
    jest.spyOn(apiFood, 'fetchFoodNameData').mockResolvedValueOnce({ meals: [{ idMeal: '1234', strMeal: 'Pizza', strMealThumb: 'img.jpg' }] });

    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

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

    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);

    fireEvent.click(firstLetterRadio);
    fireEvent.change(searchInput, { target: { value: 'ab' } });
    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('alerts the user when no recipes are found', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(apiFood, 'fetchFoodNameData').mockResolvedValueOnce({ meals: null });

    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const searchButton = screen.getByTestId('exec-search-btn');

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

    render(
      <MemoryRouter>
        <SearchBar searchContext="drink" />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);

    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'Cocktail' } });
    await act(async () => {
      fireEvent.click(searchButton);
    });
  });
  // ......................
  // ......................
});

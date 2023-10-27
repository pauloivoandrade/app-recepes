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
const MOCK_IMG = 'mockImg.jpg';

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
    alertSpy.mockRestore();
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

  it('sets searchType state to ingredient when ingredient radio button is clicked', () => {
    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO_TEST_ID);
    fireEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
  });

  it('displays an alert for invalid search input', async () => {
    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);

    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'P' } });

    await act(async () => {
      fireEvent.click(searchButton);
    });
  });
  // ......................

  it('sets the first 12 recipes when multiple are found', async () => {
    const mockRecipes = Array(15).map((_, i) => ({ idMeal: `id${i}`, strMeal: `Meal${i}`, strMealThumb: `img${i}.jpg` }));

    jest.spyOn(apiFood, 'fetchFoodNameData').mockResolvedValueOnce({ meals: mockRecipes });

    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);

    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'Meal' } });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    mockRecipes.slice(0, 12).forEach((meal, index) => {
      expect(screen.getByTestId(`${index}-card-name`)).toHaveTextContent(meal.strMeal);
    });

    mockRecipes.slice(12).forEach((meal, index) => {
      expect(screen.queryByTestId(`${index + 12}-card-name`)).toBeNull();
    });
  });

  it('fetches food data when search type is ingredient', async () => {
    const mockFoodData = {
      meals: [{ idMeal: '12345', strMeal: 'Pasta', strMealThumb: MOCK_IMG }],
    };
    jest.spyOn(apiFood, 'fetchFoodIngredientsData').mockResolvedValueOnce(mockFoodData);

    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO_TEST_ID);
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);

    fireEvent.click(ingredientRadio);
    fireEvent.change(searchInput, { target: { value: 'Pasta' } });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(apiFood.fetchFoodIngredientsData).toHaveBeenCalledWith('Pasta');
  });
  it('fetches food data when search type is first-letter and input is valid', async () => {
    const mockFoodData = {
      meals: [{ idMeal: '12345', strMeal: 'Apple Pie', strMealThumb: MOCK_IMG }],
    };
    jest.spyOn(apiFood, 'fetchFoodFirstLetter').mockResolvedValueOnce(mockFoodData);

    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID);
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);

    fireEvent.click(firstLetterRadio);
    fireEvent.change(searchInput, { target: { value: 'A' } });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(apiFood.fetchFoodFirstLetter).toHaveBeenCalledWith('A');
  });
  it('fetches drink data when searchContext is drink and search type is name', async () => {
    const mockDrinkData = {
      drinks: [{ idDrink: '12345', strDrink: 'Mojito', strDrinkThumb: MOCK_IMG }],
    };
    jest.spyOn(apiDrinks, 'fetchDrinkNameData').mockResolvedValueOnce(mockDrinkData);

    render(
      <MemoryRouter>
        <SearchBar searchContext="drink" />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    const nameRadio = screen.getByTestId(NAME_RADIO_TEST_ID);
    const searchButton = screen.getByTestId(EXEX_SEARCH_BTN_TEST);

    fireEvent.click(nameRadio);
    fireEvent.change(searchInput, { target: { value: 'Mojito' } });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(apiDrinks.fetchDrinkNameData).toHaveBeenCalledWith('Mojito');
  });

  describe('<SearchBar /> fetchDataBasedOnSearch', () => {
    it('fetches drink data when searchType is "ingredient" and context is "drink"', async () => {
      const mockFetch = jest.spyOn(apiDrinks, 'fetchDrinkIngredientsData').mockResolvedValueOnce({ drinks: [] });
      render(<MemoryRouter><SearchBar searchContext="drink" /></MemoryRouter>);

      fireEvent.change(screen.getByTestId(SEARCH_INPUT_TEST_ID), { target: { value: 'vodka' } });
      fireEvent.click(screen.getByTestId(INGREDIENT_RADIO_TEST_ID));

      await act(async () => {
        fireEvent.click(screen.getByTestId(EXEX_SEARCH_BTN_TEST));
      });

      expect(mockFetch).toHaveBeenCalledWith('vodka');
    });

    it('fetches food data when searchType is "ingredient" and context is "food"', async () => {
      const mockFetch = jest.spyOn(apiFood, 'fetchFoodIngredientsData').mockResolvedValueOnce({ meals: [] });
      render(<MemoryRouter><SearchBar searchContext="food" /></MemoryRouter>);

      fireEvent.change(screen.getByTestId(SEARCH_INPUT_TEST_ID), { target: { value: 'chicken' } });
      fireEvent.click(screen.getByTestId(INGREDIENT_RADIO_TEST_ID));

      await act(async () => {
        fireEvent.click(screen.getByTestId(EXEX_SEARCH_BTN_TEST));
      });

      expect(mockFetch).toHaveBeenCalledWith('chicken');
    });

    it('alerts when searchType is "first-letter" and searchValue has more than one character', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      render(<MemoryRouter><SearchBar searchContext="food" /></MemoryRouter>);

      fireEvent.change(screen.getByTestId(SEARCH_INPUT_TEST_ID), { target: { value: 'ab' } });
      fireEvent.click(screen.getByTestId(FIRST_LETTER_RADIO_TEST_ID));

      await act(async () => {
        fireEvent.click(screen.getByTestId(EXEX_SEARCH_BTN_TEST));
      });

      expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
      alertSpy.mockRestore();
    });

    it('returns null for an invalid searchType', async () => {
      render(<MemoryRouter><SearchBar searchContext="food" /></MemoryRouter>);

      await act(async () => {
        fireEvent.click(screen.getByTestId(EXEX_SEARCH_BTN_TEST));
      });
    });
  });
});

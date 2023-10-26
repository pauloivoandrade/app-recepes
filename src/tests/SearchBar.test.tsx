import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const SEARCH_INPUT_TEST_ID = 'search-input';
const INGREDIENT_RADIO_TEST_ID = 'ingredient-search-radio';
const NAME_RADIO_TEST_ID = 'name-search-radio';
const FIRST_LETTER_RADIO_TEST_ID = 'first-letter-search-radio';

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
});

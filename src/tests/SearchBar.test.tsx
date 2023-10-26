import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importe o MemoryRouter
import SearchBar from '../components/SearchBar';

describe('<SearchBar />', () => {
  it('renders search input and radio buttons correctly', () => {
    render(
      <MemoryRouter>
        <SearchBar searchContext="food" />
      </MemoryRouter>,
    );

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

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

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    fireEvent.click(nameRadio);
    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    fireEvent.click(firstLetterRadio);
    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).toBeChecked();
  });
});

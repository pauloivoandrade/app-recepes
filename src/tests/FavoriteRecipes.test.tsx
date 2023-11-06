import 'matchmedia-polyfill';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteRecipes } from '../components/FavoriteRecipes';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const TESTE1 = '0-horizontal-name';
const TESTE2 = '1-horizontal-name';

describe('Favoritos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Testa se renderiza receitas favoritas', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    console.log(screen.getByText('Favorite Recipes'));

    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });

  test('Testa se renderiza os botões', () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /meals/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
  });

  test('Testa se filtra as receitas pelo "all"', () => {
    const recipe1 = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    const recipe2 = { id: 2, name: 'Recipe 2', type: 'drink', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe1, recipe2]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
    expect(screen.getByTestId(TESTE2)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
    expect(screen.getByTestId(TESTE2)).toBeInTheDocument();
  });

  test('Testa se filtra as receitas por "meals"', () => {
    const firstParam = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    const secondParam = { id: 2, name: 'Recipe 2', type: 'drink', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([firstParam, secondParam]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
    expect(screen.getByTestId(TESTE2)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
    expect(screen.queryByTestId(TESTE2)).not.toBeInTheDocument();
  });

  test('Testa se renderiza por "drinks"', () => {
    const firstParam = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    const secondParam = { id: 2, name: 'Recipe 2', type: 'drink', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([firstParam, secondParam]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
    expect(screen.getByTestId(TESTE2)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.queryByTestId(TESTE2)).not.toBeInTheDocument();
    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
  });
  test('Testa se remove a receita dos favoritos', () => {
    const firstParam = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    const secondParam = { id: 2, name: 'Recipe 2', type: 'drink', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([firstParam, secondParam]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
    expect(screen.getByTestId(TESTE2)).toBeInTheDocument();
    const remove = screen.getByTestId('1-horizontal-favorite-btn');
    fireEvent.click(remove);
    expect(screen.queryByTestId(TESTE2)).toBeNull();
  });
  test('Testa campo de escrita', async () => {
    const firtsParam = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([firtsParam]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );

    expect(screen.getByTestId(TESTE1)).toBeInTheDocument();
    const sendBtn = screen.getByTestId('0-horizontal-share-btn');
    fireEvent.click(sendBtn);
    const clip = await navigator.clipboard.readText();
    expect(clip).toBe('http://localhost:3000/meals/1');
  });
});

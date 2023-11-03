import 'matchmedia-polyfill';
import React from 'react';
import { fireEvent, screen, render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { describe, it, expect, vi, afterEach, beforeEach, SpyInstance } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { DoneRecipes } from '../components/DoneRecipes';

const PROFILE_BTN_TEST_ID = 'profile-top-btn';
const PAGE_TITLE_TEST_ID = 'page-title';
const SEARCH_BTN_TEST_ID = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Header', () => {
  it('Rota "/": não possui header', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.queryByTestId(PROFILE_BTN_TEST_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(PAGE_TITLE_TEST_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa', () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(screen.getByTestId(PROFILE_BTN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Meals');
    expect(screen.getByTestId(SEARCH_BTN_TEST_ID)).toBeInTheDocument();
  });

  it('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    expect(screen.getByTestId(PROFILE_BTN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Drinks');
    expect(screen.getByTestId(SEARCH_BTN_TEST_ID)).toBeInTheDocument();
  });

  it('Rota "/profile": possui o header com o título "Profile" e apenas o ícone de perfil', () => {
    renderWithRouter(<App />, { route: '/profile' });
    expect(screen.getByTestId(PROFILE_BTN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Profile');
    expect(screen.queryByTestId(SEARCH_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('Rota "/done-recipes": possui o header com o título "Done Recipes" e apenas o ícone de perfil', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    expect(screen.getByTestId(PROFILE_BTN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Done Recipes');
    expect(screen.queryByTestId(SEARCH_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e apenas o ícone de perfil', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    expect(screen.getByTestId(PROFILE_BTN_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent('Favorite Recipes');
    expect(screen.queryByTestId(SEARCH_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('Clicar no ícone de pesquisa mostra a barra de pesquisa', () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    fireEvent.click(searchBtn);
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
  });

  it('Alternar barra de pesquisa ', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    fireEvent.keyDown(searchBtn, { key: 'Enter' });
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();

    fireEvent.keyDown(searchBtn, { key: ' ' });
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  it('Rota "/meals/[dynamic-part]": não possui header', () => {
    renderWithRouter(<App />, { route: '/meals/randomMeal' });
    expect(screen.queryByTestId(PROFILE_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('Rota "/drinks/[dynamic-part]": não possui header', () => {
    renderWithRouter(<App />, { route: '/drinks/randomDrink' });
    expect(screen.queryByTestId(PROFILE_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('Rota "/meals/[dynamic-part]/in-progress": não possui header', () => {
    renderWithRouter(<App />, { route: '/meals/randomMeal/in-progress' });
    expect(screen.queryByTestId(PROFILE_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('Rota "/drinks/[dynamic-part]/in-progress": não possui header', () => {
    renderWithRouter(<App />, { route: '/drinks/randomDrink/in-progress' });
    expect(screen.queryByTestId(PROFILE_BTN_TEST_ID)).not.toBeInTheDocument();
  });

  it('renders DoneRecipes without crashing', () => {
    renderWithRouter(<DoneRecipes />);
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
  });

  it('filters recipes when filter buttons are clicked', () => {
    const meals = [
      { id: '1', type: 'meal', name: 'Meal1' },
      { id: '2', type: 'meal', name: 'Meal2' },
    ];
    const drinks = [
      { id: '3', type: 'drink', name: 'Drink1' },
      { id: '4', type: 'drink', name: 'Drink2' },
    ];
    const doneRecipes = [...meals, ...drinks];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    renderWithRouter(<DoneRecipes />);

    fireEvent.click(screen.getByTestId('filter-by-meal-btn'));

    meals.forEach((meal) => {
      expect(screen.getByText(meal.name)).toBeInTheDocument();
    });
    drinks.forEach((drink) => {
      expect(screen.queryByText(drink.name)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('filter-by-drink-btn'));

    drinks.forEach((drink) => {
      expect(screen.getByText(drink.name)).toBeInTheDocument();
    });
    meals.forEach((meal) => {
      expect(screen.queryByText(meal.name)).not.toBeInTheDocument();
    });
  });
});

describe('DoneRecipes component', () => {
  const doneRecipesMock = [
    {
      id: '1',
      type: 'meal',
      nationality: 'Italian',
      category: 'Pasta',
      alcoholicOrNot: '',
      name: 'Spaghetti Carbonara',
      image: 'image-url',
      doneDate: '2023-05-30',
      tags: ['tag1', 'tag2'],
    },

  ];

  let clipboardSpy: SpyInstance<[data: string], Promise<void>>;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.spyOn(global.localStorage, 'getItem');
    vi.spyOn(global.localStorage, 'setItem');
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    vi.useFakeTimers();

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
  });

  afterEach(() => {
    clipboardSpy.mockRestore();
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('navigates to the recipe detail page when a recipe name is clicked', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Routes>
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/meals/:id" element={ <p>Meal Detail Page</p> } />
        </Routes>
      </MemoryRouter>,
    );

    const recipeNameButton = screen.getByTestId('0-horizontal-name');
    fireEvent.click(recipeNameButton);
    expect(screen.getByText('Meal Detail Page')).toBeInTheDocument();
  });

  it('copies the correct URL to clipboard when share button is clicked', async () => {
    render(<DoneRecipes />, { wrapper: MemoryRouter });
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    await act(async () => {
      fireEvent.click(shareButton);
    });
    expect(clipboardSpy).toHaveBeenCalledWith('http://localhost:3000/meals/1');

    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    act(() => {
      vi.runAllTimers();
    });
    expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();
  });
});

describe('DoneRecipes 2', () => {
  const doneRecipesMock2 = [
    {
      id: '1',
      type: 'meal',
      nationality: 'Italian',
      category: 'Pasta',
      alcoholicOrNot: '',
      name: 'Spaghetti Carbonara',
      image: 'image-url',
      doneDate: '2023-04-30',
      tags: ['tag1', 'tag2'],
    }, {
      id: '2',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Margarita',
      image: 'image-url',
      doneDate: '2023-04-30',
      tags: ['tag1', 'tag2'],
    },

  ];
  let clipboardSpy: SpyInstance<[data: string], Promise<void>>;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.spyOn(global.localStorage, 'getItem');
    vi.spyOn(global.localStorage, 'setItem');
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock2));
    clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    vi.useFakeTimers();
  });

  afterEach(() => {
    clipboardSpy.mockRestore();
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should set filter to "all" when the handleFilterAll function is triggered', () => {
    render(<DoneRecipes />, { wrapper: MemoryRouter });

    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    fireEvent.click(filterAllButton);

    const mealItem = screen.getByText(doneRecipesMock2[0].name);
    const drinkItem = screen.getByText(doneRecipesMock2[1].name);

    expect(mealItem).toBeInTheDocument();
    expect(drinkItem).toBeInTheDocument();
  });
});

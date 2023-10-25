import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

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

  it('Toggle search bar with keyboard interaction', () => {
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
});

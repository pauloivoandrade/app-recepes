import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { Profile } from '../components/Profile';

describe('Profile ', () => {
  it('renders the user email and buttons', () => {
    renderWithRouter(<Profile />);

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();

    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('limpa o armazenamento local e navega para a página inicial ao clicar no botão de logout', () => {
    renderWithRouter(<Profile />);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);
  });

  it('navega para a página de receitas prontas no botão "Done Recipes", clique', () => {
    renderWithRouter(<Profile />);

    const doneButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneButton);
  });

  it('navega para a página de receitas favoritas clicando no botão "Favorite Resipes"', () => {
    renderWithRouter(<Profile />);

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteButton);
  });
});

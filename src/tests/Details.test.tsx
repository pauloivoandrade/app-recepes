import React from 'react';
import 'matchmedia-polyfill';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import '@testing-library/jest-dom';

describe('Teste pagina de Details', async () => {
  const routeDetail = '/meals/52977';
  it('Rota "/meals/52977" renderiza corretamente o card', async () => {
    const mealTestIdImg = 'recipe-photo';
    renderWithRouter(<App />, { route: routeDetail });

    await waitFor(() => {
      const mealImage = screen.getByTestId(mealTestIdImg);
      expect(mealImage).toBeInTheDocument();
    });
  });
  it('Teste se o botao Start Recipe direciona para a rota correta', () => {
    renderWithRouter(<App />, { route: routeDetail });
    waitFor(() => {
      const startBtn = screen.getByTestId('start-recipe-btn');
      expect(startBtn).toBeInTheDocument();
    });
  });
  it('Rota "/meals/52977" renderiza botao de favorito e de copiar link da receita', async () => {
    const favBtn = 'favorite-btn';
    const copyLink = 'share-btn';
    renderWithRouter(<App />, { route: routeDetail });

    await waitFor(() => {
      const favoriteButton = screen.getByTestId(favBtn);
      expect(favoriteButton).toBeInTheDocument();
      const shareButton = screen.getByTestId(copyLink);
      expect(shareButton).toBeInTheDocument();
    });
  });
});
describe('Teste alerta de link copiado', async () => {
  const routeDetail = '/meals/52977';
  it('alerta de link copiado aparece na tela', async () => {
    renderWithRouter(<App />, { route: '/drinks/17222' });
    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
      setTimeout(() => {
        expect(screen.getByText('Copied link!')).toBeInTheDocument();
      }, 2000);
    });
  });
  it('alerta de link copiado aparece na tela', async () => {
    renderWithRouter(<App />, { route: routeDetail });
    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
      setTimeout(() => {
        expect(screen.getByText('Copied link!')).toBeInTheDocument();
      }, 2000);
    });
  });
  test('renders loading message while fetching data', async () => {
    renderWithRouter(<App />, { route: routeDetail });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('displays "Link copied!" message after clicking share button', async () => {
    renderWithRouter(<App />, { route: routeDetail });

    await waitFor(async () => {
      const shareBtn = screen.getByTestId('share-btn');
      act(() => {
        userEvent.click(shareBtn);
      });

      expect(screen.queryByTestId('copied-message')).toBeInTheDocument();
      expect(await navigator.clipboard.readText()).toBe('http://localhost:3000/meals/52977');
      screen.debug();
    });
  });
});

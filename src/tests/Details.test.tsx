import React from 'react';
import 'matchmedia-polyfill';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import '@testing-library/jest-dom';

describe('Teste pagina de Details', async () => {
  const routeDetail = '/meals/52977';
  it('Rota "/meals/52977" renderiza corretamente o card', async () => {
    const mealTestIdImg = 'recipe-photo';
    await renderWithRouter(<App />, { route: routeDetail });

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
  it('Rota "/drinks/17222" renderiza corretamente o card', async () => {
    const mealTestIdImg = 'recipe-photo';
    await renderWithRouter(<App />, { route: '/drinks/17222' });

    await waitFor(() => {
      const drinkImage = screen.getByTestId(mealTestIdImg);
      expect(drinkImage).toBeInTheDocument();
    });
  });
  it('Rota "/meals/52977" renderiza os detalhes da receita', async () => {
    const mealTestIdIngredient = '0-ingredient-name-and-measure';
    await renderWithRouter(<App />, { route: routeDetail });

    await waitFor(() => {
      const mealIngredient = screen.getByTestId(mealTestIdIngredient);
      expect(mealIngredient).toBeInTheDocument();
    });
  });
  it('Rota "/meals/52977" renderiza as instrucoes da receita', async () => {
    const mealTestIdInstructions = 'instructions';
    await renderWithRouter(<App />, { route: routeDetail });

    await waitFor(() => {
      const mealInstructions = screen.getByTestId(mealTestIdInstructions);
      expect(mealInstructions).toBeInTheDocument();
    });
  });
  it('Rota "/meals/52977" renderiza botao de favorito e de copiar link da receita', async () => {
    const favBtn = 'favorite-btn';
    const copyLink = 'share-btn';
    await renderWithRouter(<App />, { route: routeDetail });

    await waitFor(() => {
      const favoriteButton = screen.getByTestId(favBtn);
      expect(favoriteButton).toBeInTheDocument();
      const shareButton = screen.getByTestId(copyLink);
      expect(shareButton).toBeInTheDocument();
    });
  });
});
describe('Teste alerta de link copiado', async () => {
  it('alerta de link copiado aparece na tela', async () => {
    await renderWithRouter(<App />, { route: '/drinks/17222' });
    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
      setTimeout(() => {
        expect(screen.getByText('Copied link!')).toBeInTheDocument();
      }, 2000);
    });
  });
});

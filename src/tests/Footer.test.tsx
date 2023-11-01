import 'matchmedia-polyfill';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste se rotas possuem footer', () => {
  it('Rota "/": não deve ter footer', () => {
    const footer = 'footer';
    renderWithRouter(<App />, { route: '/' });
    expect(screen.queryByTestId(footer)).not.toBeInTheDocument();
  });

  it('Rota meals footer', () => {
    const footer = 'footer';
    renderWithRouter(<App />, { route: '/meals' });
    expect(screen.queryByTestId(footer)).toBeInTheDocument();
  });

  it('Rota drinks footer', () => {
    const footer = 'footer';
    renderWithRouter(<App />, { route: '/drinks' });
    expect(screen.queryByTestId(footer)).toBeInTheDocument();
  });

  // describe('Teste do componente Footer', () => {
  // test('se ao clicar no icon em "/profile" redireciona para "/drinks"', async () => {
  //   renderWithRouter(<App />, { route: '/profile' });
  //   const drinksBtn = screen.getByTestId('drinks-bottom-btn');
  //   await userEvent.click(drinksBtn);
  // });

  //   test('Renderiza "/profile" e ao licar no icone redireciona para "/meals"', async () => {
  //     renderWithRouter(<App />, { route: '/profile' });
  //     const mealsBtn = screen.getByTestId('meals-bottom-btn');
  //     await userEvent.click(mealsBtn);
  //   });

  // it('Renderiza no componente meals e redireciona para drinks/meals', async () => {
  //   renderWithRouter(<App />, { route: '/meals' });
  //   const drinksBtn = screen.getByTestId('drinks-bottom-btn');
  //   await userEvent.click(drinksBtn);
  //   expect(window.location.pathname).toBe('/drinks');
  // });
  //   it('Testa os fetchs da meals e drinks no contexto global', async () => {
  // });
});

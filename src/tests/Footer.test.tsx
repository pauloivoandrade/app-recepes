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

  it('Rota profile footer', () => {
    const footer = 'footer';
    renderWithRouter(<App />, { route: '/profile' });
    expect(screen.queryByTestId(footer)).toBeInTheDocument();
  });
});

describe('Teste do componente Footer', () => {
  test('se ao clicar no icon em "/profile" redireciona para "/drinks"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });
    const footer = screen.getByTestId('footer');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    await user.click(drinksBtn);

    expect(window.location.pathname).toBe('/drinks');
    expect(footer).toBeInTheDocument();
  });
  test('Renderiza  "/profile" e ao licar no icone redireciona para "/meals"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });
    const footer = screen.getByTestId('footer');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    await user.click(mealsBtn);
    expect(window.location.pathname).toBe('/meals');
    expect(footer).toBeInTheDocument();
  });
});

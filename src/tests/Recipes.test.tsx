import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import drinks from './mocks/drinks';
import meals from './mocks/meals';
import chickenMeals from './mocks/chicken';
import mealCategories from './mocks/mealCategories';

const emailInputId = 'email-input';
const passwordInputId = 'password-input';
const loginSubmitBtnId = 'login-submit-btn';
const stringEmail = 'pede@fava.com';
const stringPassword = 'vergoindaprofission';

afterEach(() => {
  vi.clearAllMocks();
});

test('Caso as receitas sejam de comida, a rota deve mudar para a tela de detalhes da receita', async () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputId);
  const passwordInput = screen.getByTestId(passwordInputId);
  const loginSubmitBtn = screen.getByTestId(loginSubmitBtnId);
  await userEvent.type(emailInput, stringEmail);
  await userEvent.type(passwordInput, stringPassword);
  await userEvent.click(loginSubmitBtn);
  expect(window.location.pathname).toBe('/meals');
});

test('Caso as receitas sejam de bebida, a rota deve mudar para a tela de detalhes da receita', async () => {
  renderWithRouter(<App />);

  const emailInput = screen.getByTestId(emailInputId);
  const passwordInput = screen.getByTestId(passwordInputId);
  const loginSubmitBtn = screen.getByTestId(loginSubmitBtnId);
  await userEvent.type(emailInput, stringEmail);
  await userEvent.type(passwordInput, stringPassword);
  await userEvent.click(loginSubmitBtn);
  const drinksBtn = screen.getByTestId('drinks-bottom-btn');
  await userEvent.click(drinksBtn);
  expect(window.location.pathname).toBe('/drinks');
});

test('Verifica chamada da api', async () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputId);
  const passwordInput = screen.getByTestId(passwordInputId);
  const loginSubmitBtn = screen.getByTestId(loginSubmitBtnId);
  await userEvent.type(emailInput, stringEmail);
  await userEvent.type(passwordInput, stringPassword);
  await userEvent.click(loginSubmitBtn);

  await new Promise((resolve) => { setTimeout(resolve, 2000); });
  await waitFor(() => {
    const ultItem = screen.getByTestId('11-recipe-card');
    expect(ultItem).toBeInTheDocument();
  });
});

test('Verifica se drinks são renderizados, se meals não são renderizados', async () => {
  const mockResponse = { json: async () => drinks } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  await act(async () => {
    renderWithRouter(<App />, { route: '/drinks' });
  });
  const firstDrink = screen.getByTestId('0-card-name');
  const secondDrink = screen.getByTestId('1-card-name');
  expect(firstDrink).toBeInTheDocument();
  expect(secondDrink).toBeInTheDocument();
});

test('Verifica filtro de categoria', async () => {
  const mockResponse = { json: async () => meals } as Response;
  const mockResponse2 = { json: async () => chickenMeals } as Response;
  const mockResponse3 = { json: async () => mealCategories } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse)
    .mockResolvedValueOnce(mockResponse3).mockResolvedValueOnce(mockResponse2)
    .mockResolvedValueOnce(mockResponse);
  // await act(async () => {
  renderWithRouter(<App />, { route: '/meals' });
  // });
  await waitFor(() => {
    const chickenBtn = screen.getByTestId('Chicken-category-filter');
    userEvent.click(chickenBtn);
  }, { timeout: 3000 });
  await new Promise((resolve) => { setTimeout(resolve, 3000); });
  await waitFor(async () => {
    const firstChicken = screen.getByText('Brown Stew Chicken');
    expect(firstChicken).toBeInTheDocument();
    const btnAllRecipes = screen.getByTestId('All-category-filter');
    expect(btnAllRecipes).toBeInTheDocument();
    const chickenBtn = screen.getByTestId('Chicken-category-filter');
    await userEvent.click(chickenBtn);
    await userEvent.click(btnAllRecipes);
    const firstAll = screen.getByText('Corba');
    expect(firstAll).toBeInTheDocument();
  });
});

// test('Verifica se apenas as receitas da categoria correta são exibidas após o clique', async () => {
//   const mockResponse = { json: async () => meals } as Response;
//   const mockResponse2 = { json: async () => chickenMeals } as Response;
//   const mockResponse3 = { json: async () => mealCategories } as Response;
//   vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse)
//     .mockResolvedValueOnce(mockResponse3).mockResolvedValueOnce(mockResponse2);

//   renderWithRouter(<App />, { route: '/meals' });

//   await new Promise((resolve) => { setTimeout(resolve, 2000); });
//   await waitFor(() => {
//     const ultItem = screen.getByTestId('0-recipe-card');
//     expect(ultItem).toBeInTheDocument();
//   });

//   const categoryButton = screen.getByTestId('Chicken-category-filter');
//   await userEvent.click(categoryButton);

//   expect(chickenRecipe).toBeInTheDocument();
//   expect(screen.queryByText('Beef Recipe')).toBeNull();
// });

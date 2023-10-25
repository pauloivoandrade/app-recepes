import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('footer', async () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginSubmitBtn = screen.getByTestId('login-submit-btn');
  expect(loginSubmitBtn).toBeDisabled();
  await userEvent.type(emailInput, 'ivan@gmail.com');
  await userEvent.type(passwordInput, 'lalalala');
  expect(loginSubmitBtn).toBeEnabled();
  await userEvent.click(loginSubmitBtn);
  expect(window.location.pathname).toBe('/meals');

  it('Redenriza no componente meals e redireciona para drinks/meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const footer = screen.getByTestId('footer');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    await user.click(drinksBtn);

    expect(window.location.pathname).toBe('/drinks');
    expect(footer).toBeInTheDocument();

    await user.click(mealsBtn);

    expect(window.location.pathname).toBe('/meals');
    expect(footer).toBeInTheDocument();
  });
});

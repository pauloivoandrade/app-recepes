import 'matchmedia-polyfill';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('login', async () => {
  it('', async () => {
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
  });
});

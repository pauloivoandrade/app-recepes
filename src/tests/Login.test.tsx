import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('Testa o componente Login', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginSubmitBtn = screen.getByTestId('login-submit-btn');
  await userEvent.type(emailInput, 'ivan@gmail.com');
  await userEvent.type(passwordInput, 'lalalala');
  expect(loginSubmitBtn).toBeEnabled();
  await userEvent.click(loginSubmitBtn);
});

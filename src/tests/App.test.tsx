import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('Farewell, front-end', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
});

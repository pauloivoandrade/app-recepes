import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import IngredientCard from '../components/IngredientCard';

describe('IngredientCard', () => {
  test('renders ingredient card', () => {
    render(
      <BrowserRouter>
        <IngredientCard
          index={ 1 }
          ingredientId="200g"
          ingredient="Flour"
          product="Product"
        />
      </BrowserRouter>,
    );
    const ingredientNameElement = screen.getByText(/Flour - 200g/i);
    expect(ingredientNameElement).toBeInTheDocument();
  });

  // test('allows checking ingredient as finished', () => {
  //   render(
  //     <BrowserRouter>
  //       <IngredientCard
  //         index={ 1 }
  //         ingredientId="200g"
  //         ingredient="Flour"
  //         product="Product"
  //       />
  //     </BrowserRouter>,
  //   );
  //   const checkbox = screen.getByLabelText(/Flour - 200g/i);
  //   fireEvent.click(checkbox);
  //   expect(checkbox).toBeChecked();
  // });
});

import React from 'react';
import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button type="button" onClick={ () => navigate('/meals') }>
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="food"
        />
      </button>
      <button type="button" onClick={ () => navigate('/drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink"
        />
      </button>
    </footer>
  );
}
export default Footer;

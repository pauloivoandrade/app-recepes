import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';
import MainContext from '../../context/maincontext-context';

export function Footer() {
  const navigate = useNavigate();
  const { setIsMeals } = useContext(MainContext);

  const handleClickMeals = () => {
    setIsMeals(true);
    navigate('/meals');
  };

  const handleClickDrinks = () => {
    setIsMeals(false);
    navigate('/drinks');
  };

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button type="button" onClick={ () => handleClickMeals() }>
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="food"
        />
      </button>
      <button type="button" onClick={ () => handleClickDrinks() }>
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

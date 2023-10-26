import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';
import MainContext from '../../context/maincontext-context';
import { mealsFetch12 } from '../../services/apiFood';
import { drinksFetch12 } from '../../services/apiDrinks';

export function Footer() {
  const navigate = useNavigate();
  const { setRecipeFetch } = useContext(MainContext);

  const handleClickMeals = async () => {
    navigate('/meals');
    const response = await mealsFetch12();
    setRecipeFetch(response);
  };

  const handleClickDrinks = async () => {
    navigate('/drinks');
    const response = await drinksFetch12();
    setRecipeFetch(response);
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

import { useNavigate } from 'react-router-dom';
import { getFromStorage } from '../services/localStorage';

export function Profile() {
  const navigate = useNavigate();
  const emailFromStorage = getFromStorage('user') || ({ email: '' });
  const { email } = emailFromStorage;

  const cleanLocalStorage = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          onClick={ () => navigate('/done-recipes') }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          onClick={ () => navigate('/favorite-recipes') }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          onClick={ () => cleanLocalStorage() }
          data-testid="profile-logout-btn"
        >
          Logout

        </button>
      </div>
    </div>
  );
}

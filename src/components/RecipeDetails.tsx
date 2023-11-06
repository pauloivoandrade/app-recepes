import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CarouselCard } from './CarouselCard';
import StartRecipe from './StartRecipe';
// import localStorage from '../services/localStorage';
import HeartButton from './HeartButton';
import shareIcon from '../images/shareIcon.svg';

export function DetailsCard() {
  // const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isMeals = pathname.includes('/meals');
  const [copied, setCopied] = useState(false);

  const [recipeDetail, setRecipesDetail] = useState<any | null>(null);
  useEffect(() => {
    let fetchFunction;

    if (isMeals) {
      fetchFunction = async () => {
        const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const mealsJson = await meals.json();
        setRecipesDetail(mealsJson.meals[0]);
      };
    } else {
      fetchFunction = async () => {
        const drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const drinksJson = await drinks.json();
        setRecipesDetail(drinksJson.drinks[0]);
      };
    }

    fetchFunction();
  }, [isMeals, id]);

  if (!recipeDetail) {
    return <div>Loading...</div>;
  }

  // const handleStartRecipe = () => {
  //   if (recipeDetail && isMeals) {
  //     navigate(`/meals/${recipeID}/in-progress`, { state: { recipeDetail } });
  //   } else if (recipeDetail && !isMeals) {
  //     navigate(`/drinks/${recipeID}/in-progress`, { state: { recipeDetail } });
  //   }
  // };

  const handleCopyToClipboard = async () => {
    const link = window.location.href;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (error) {
      console.error('Erro ao copiar o link: ', error);
    }
  };

  // console.log(recipeDetail);
  return (
    <div>
      <HeartButton recipeDetail={ recipeDetail } />
      <button
        style={ {
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding: 0,
        } }
        onClick={ handleCopyToClipboard }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Ícone de compartilhamento"
          style={ { width: '50px', height: '50px' } }
        />
      </button>

      {copied && <p data-testid="copied-message">Link copied!</p>}
      <img
        data-testid="recipe-photo"
        src={ recipeDetail.strMealThumb || recipeDetail.strDrinkThumb }
        alt={ isMeals ? recipeDetail.strMeal : recipeDetail.strDrink }
      />
      <h1 data-testid="recipe-title">
        {isMeals ? recipeDetail.strMeal : recipeDetail.strDrink}

      </h1>
      <h1 data-testid="recipe-category">
        {isMeals ? recipeDetail.strCategory : recipeDetail.strAlcoholic}

      </h1>

      <h2>Ingredients:</h2>
      <ul>
        {Array.from({ length: 20 }, (_, index) => index).map((index) => {
          const measure = recipeDetail[`strMeasure${index}`];
          const ingredient = recipeDetail[`strIngredient${index}`];
          if (measure && ingredient) {
            return (
              <li
                key={ index }
                data-testid={ `${index - 1}-ingredient-name-and-measure` }
              >
                {measure}
                {' '}
                {ingredient}
              </li>
            );
          }
          return null;
        })}
      </ul>

      <h2>Instructions:</h2>
      <p data-testid="instructions">{recipeDetail.strInstructions}</p>

      <h2>Video:</h2>
      <iframe
        data-testid="video"
        width="640"
        height="360"
        frameBorder="0"
        allowFullScreen
        src={ recipeDetail.strVideo ? recipeDetail.strVideo.replace('watch?v=', 'embed/')
          : 'no video available' }
        title="Embedded Video"
      />

      <h3>Recommended</h3>
      <CarouselCard />
      <StartRecipe />

    </div>

  );
}

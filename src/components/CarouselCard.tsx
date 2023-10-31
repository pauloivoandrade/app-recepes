import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function CarouselCard() {
  const { pathname } = useLocation();
  const isMeals = pathname.includes('/meals');
  const [recommended, setRecommended] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      let endpoint = '';
      if (isMeals) {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      } else {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      const limitedData = isMeals ? data.drinks.slice(0, 6) : data.meals.slice(0, 6);
      setRecommended(limitedData);
    };

    fetchRecommended();
  }, [isMeals]);

  if (recommended.length === 0) {
    return <div>Loading...</div>;
  }

  const settings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider { ...settings }>
        {recommended.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recommendation-card` }>
            <h5 data-testid={ `${index}-recommendation-title` }>
              {isMeals ? recipe.strDrink : recipe.strMeal}
            </h5>
            <img src={ isMeals ? recipe.strDrinkThumb : recipe.strMealThumb } alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

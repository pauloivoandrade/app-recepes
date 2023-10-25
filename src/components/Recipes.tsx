import { useEffect, useState } from 'react';
import { mealsFetch12 } from '../services/apiFood';
import { RecipesCard } from './RecipesCard';

export function Recipes() {
  const [recipeFetch, setRecipeFetch] = useState([]);

  const mealFetch = async () => {
    const response = await mealsFetch12();
    setRecipeFetch(response);
    return response;
  };

  useEffect(() => {
    mealFetch();
  }, []);

  return (
    <div>
      <h1>
        { recipeFetch?.map((element: any, index: number) => (
          <RecipesCard
            key={ index }
            index={ index }
            recipe={ element }
          />
        )) }

      </h1>
    </div>
  );
}

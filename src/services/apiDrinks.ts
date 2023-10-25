import { useState, useEffect } from 'react';

export default function useFetchApiDrinks(
  ingrediente: string,
  nome: string,
  primeiraletra: string,
) {
  const [apiIngredients, setApiIngredients] = useState({});
  const [apiName, setApiName] = useState({});
  const [apiFirstLetter, setApiFirstLetter] = useState({});

  const fetchIngredientsData = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const ingredientData = await response.json();
    setApiIngredients(ingredientData);
  };
  const fetchNameData = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
    const nomeData = await response.json();
    setApiName(nomeData);
  };
  const fetchFirstLetter = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraletra}`);
    const letterData = await response.json();
    setApiFirstLetter(letterData);
  };

  useEffect(() => {
    fetchFirstLetter();
    fetchIngredientsData();
    fetchNameData();
  }, []);
  console.log(fetchFirstLetter());

  return {
    apiIngredients,
    apiFirstLetter,
    apiName,
  };
}

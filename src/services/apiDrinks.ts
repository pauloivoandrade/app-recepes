export async function fetchDrinkIngredientsData(ingrediente: string) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const ingredientData = await response.json();
  return ingredientData;
}
export async function fetchDrinkNameData(nome: string) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const nomeData = await response.json();
  return nomeData;
}
export async function fetchDrinkFirstLetter(primeiraLetra: string) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const letterData = await response.json();
  return letterData;
}

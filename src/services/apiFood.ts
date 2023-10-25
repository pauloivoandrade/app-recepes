export async function fetchFoodIngredientsData(ingrediente: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const ingredientData = await response.json();
  return ingredientData;
}
export async function fetchFoodNameData(nome: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const nomeData = await response.json();
  return nomeData;
}
export async function fetchFoodFirstLetter(primeiraLetra: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const letterData = await response.json();
  return letterData;
}

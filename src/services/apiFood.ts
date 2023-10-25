import { useState, useEffect } from 'react';

export default function useFetchApiFood(
  ingrediente: string,
  nome: string,
  primeiraletra: string,
) {
  const [apiIngredients, setApiIngredients] = useState({});
  const [apiName, setApiName] = useState({});
  const [apiFirstLetter, setApiFirstLetter] = useState({});

  const fetchIngredientsData = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const ingredientData = await response.json();
    setApiIngredients(ingredientData);
  };
  const fetchNameData = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const nomeData = await response.json();
    setApiName(nomeData);
  };
  const fetchFirstLetter = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraletra}`);
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
// import React, { useState } from 'react';
// import { useFetchIngredientsData } from './seuArquivoComOHook'; // Substitua com o caminho correto para o seu arquivo

// function MeuComponente() {
//   const [ingrediente, setIngrediente] = useState(''); // Estado para armazenar o valor do input
//   const { apiIngredients } = useFetchIngredientsData(ingrediente);

//   const handleInputChange = (event) => {
//     setIngrediente(event.target.value); // Atualiza o estado com o valor do input
//   };

//   // Restante do seu componente com um input controlado
//   return (
//     <div>
//       <input
//         type="text"
//         value={ingrediente}
//         onChange={handleInputChange}
//         placeholder="Digite o ingrediente"
//       />
//       {/* Renderiza os dados do API conforme necessário */}
//     </div>
//   );
// }
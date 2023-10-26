import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

// Importe as funções e utilitários necessários, conforme necessário

// Teste unitário para o componente SearchBar
describe('SearchBar Component', () => {
  it('Deve renderizar os elementos da barra de busca', () => {
    render(<SearchBar searchContext={'food'} />); // Renderize o componente

    // Use o screen.getByTestId para selecionar elementos com data-testid
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchButton = screen.getByTestId('exec-search-btn');

    // Realize as verificações necessárias
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
  });

  // Adicione mais testes unitários conforme necessário
});

// Testes de integração
describe('Integração com a API', () => {
  beforeEach(() => {
    // Antes de cada teste, configurar o mock de fetch para usar o seu fetchMock
    global.fetch = jest.fn(fetchMock) as any;
  });

  afterEach(() => {
    // Após cada teste, limpar o mock de fetch
    global.fetch.mockClear();
  });

  it('Deve fazer a busca por ingrediente corretamente', async () => {
    // Renderize o componente e realize ações do usuário (fireEvent) se necessário
    render(<SearchBar searchContext={'food'} />);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const execSearchButton = screen.getByTestId('exec-search-btn');

    fireEvent.click(ingredientRadio);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.click(execSearchButton);

    // Aguarde a resposta da API (pode usar waitFor ou async/await)
    await screen.findByText('Resultados da busca por ingredientes:');

    // Verifique se a chamada de fetch foi feita corretamente
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');

    // Verifique se os resultados da busca são exibidos corretamente
    expect(screen.getByText('Nome da receita 1')).toBeInTheDocument();
    expect(screen.getByText('Nome da receita 2')).toBeInTheDocument();
    // Adicione mais verificações conforme necessário
  });

  // Adicione mais testes de integração conforme necessário
});

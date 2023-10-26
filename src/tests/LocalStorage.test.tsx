import { setOnStorage, getFromStorage } from '../services/localStorage';

describe('LocalStorage functions', () => {
  it('deve definir e obter um valor do armazenamento local', () => {
    const key = 'testKey';
    const value = { name: 'John Doe', age: 30 };

    setOnStorage(key, value);
    const retrievedValue = getFromStorage(key);

    expect(retrievedValue).toEqual(value);
  });

  it('deve tratar a chave incorreta e retornar nulo', () => {
    const key = 'nonExistentKey';
    const retrievedValue = getFromStorage(key);

    expect(retrievedValue).toBeNull();
  });
});

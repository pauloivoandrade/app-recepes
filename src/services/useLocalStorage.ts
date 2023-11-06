import React from 'react';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export default function useLocalStorage<T>(key: string, initialValue: T = {} as T):
[T, SetValue<T>] {
  const readValue = React.useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (e: any) {
      console.error(`Error reading ${key} from local storage => `, e.message);
      return initialValue;
    }
  }, [initialValue, key]);

  const [item, setItem] = React.useState<T>(() => readValue());

  React.useEffect(() => {
    setItem(readValue());
  }, [readValue]);

  const setValue: SetValue<T> = React.useCallback((value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setItem(value);
    } catch (e: any) {
      console.error(`Error setting ${key} to local storage => `, e.message);
    }
  }, [key]);

  return [item, setValue];
}

export const setOnStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key: string): any => {
  const item = localStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }

  return null;
};

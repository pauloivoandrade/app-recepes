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

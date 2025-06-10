const BASE_URL = 'http://localhost:3001/clothingItems';

export const getClothingItems = () => {
  return fetch(BASE_URL).then((res) => res.json());
};

export const addClothingItem = (item) => {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  }).then((res) => res.json());
};

export const deleteClothingItem = (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};

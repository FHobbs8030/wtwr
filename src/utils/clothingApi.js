const BASE_URL = 'http://localhost:3001/clothingItems';

export const getClothingItems = () => {
  return fetch(BASE_URL).then((res) => res.json());
};

export const addClothingItem = async (item) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error('Failed to add clothing item');
  }

  return response.json();
};

export const deleteClothingItem = (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};

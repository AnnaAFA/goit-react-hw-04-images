import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const getImages = async ({ searchQuery, page } = {}) => {
  const response = await axios.get(
    `${BASE_URL}?key=33013595-4823d8185f154f9ff04c1de28&q=${searchQuery}&orientation=horizontal&per_page=12&page=${page}`
  );
  return response.data;
};

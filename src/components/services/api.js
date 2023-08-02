import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '36802849-b7af5cd62cfcc85474a5247b9';

const fetchImages = async (query, page, perPage) => {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return data;
};

export { fetchImages };

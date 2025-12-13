import { doApiRequest } from './api.js';

const searchDrinks = async (searchPath, queryParam) => {
  if (searchPath && queryParam) {
    return await doApiRequest(`${searchPath}${queryParam}`);
  } else {
    console.error('Missing a selection or input');
  }
}

export { searchDrinks }
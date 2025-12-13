import { isValidInput } from './validation.js';
import { doApiRequest } from './api.js';

const initSearch = () => {
  const inputSelect = document.getElementById('searchInput');
  const filterSelect = document.getElementById('selectFilter');
  let query,
      path;

  // Get value from the input.
  inputSelect.addEventListener('change', () => {
    const textValue = inputSelect.value;
    if (isValidInput(inputSelect.type, inputSelect, textValue)) {
      query = textValue;
    }
  });

  // Get values from the filter.
  filterSelect.addEventListener('change', () => {
    const selection = filterSelect.value;
    if (isValidInput(filterSelect.type, filterSelect, selection)) {
      switch (selection) {
        case 'name':
          path = 'search.php?s=';
          break;
        case 'firstLetter':
          path = 'search.php?f=';
          break;
        case 'ingredient':
          path = 'filter.php?i=';
          break;
        case 'glass':
          path = 'filter.php?g=';
          break;
        case 'alcoholic':
          path = 'filter.php?a=';
          break;
        default:
          break;
      }
    }
  });

  const searchButton = document.querySelector('[type="submit"]');
  searchButton.addEventListener('click', async (e) =>{
    e.preventDefault();
     await searchDrinks(path, query);
  })
}

const searchDrinks = async (searchPath, queryParam) => {
  let results = '';
  if (searchPath && queryParam) {
    results = await doApiRequest(`${searchPath}${queryParam}`);
    console.log('in search drinks', results);
    return results;
  } else {
    console.error('Missing a selection or input');
  }
}


export { searchDrinks, initSearch }
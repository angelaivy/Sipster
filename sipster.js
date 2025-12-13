'use strict';

import { searchDrinks  } from './search.js';
import { isValidInput  } from './validation.js';
import { Drink } from './Drink.js';

const inputSelect = document.getElementById('searchInput');
const filterSelect = document.getElementById('selectFilter');
const detailsContainer = document.getElementById('results');
let query,
    path;

// Get value from the input.
inputSelect?.addEventListener('change', () => {
  const textValue = inputSelect.value;
  if (isValidInput(inputSelect.type, inputSelect, textValue)) {
    query = textValue;
  }
});

// Get values from the filter.
filterSelect?.addEventListener('change', () => {
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

// Search and get results.
const searchButton = document.querySelector('[type="submit"]');
searchButton?.addEventListener('click', async (e) =>{
  e.preventDefault();
  // Clear out the container before the next query.
  detailsContainer.innerText = '';
  const results = await searchDrinks(path, query);
  const drinks = results['drinks'];
  console.log('insearchbtn', results);
  // If there are valid results display the list - should be an array.
  if (Array.isArray(drinks)) {
    // Generate the unordered list element.
    const drinkList = document.createElement('ul');
    detailsContainer.prepend(drinkList)
    // Get drinks and populate with results.
    drinks.forEach((drink) => {
      const getDrink = new Drink(
        drink.strDrink,
        drink.strDrinkThumb,
        drinkList
      );
      getDrink.generateDrink();
    });
  } else {
    detailsContainer.innerText = 'No data found, try another search.';
  }
 
})


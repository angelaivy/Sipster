'use strict';

import { doApiRequest  } from './api.js';
import { isValidInput, showInput  } from './validation.js';
import { Drink } from './Drink.js';

const inputSelect = document.getElementById('searchInput'),
      filterSelect = document.getElementById('selectFilter'),
      filterPrefSelect = document.getElementById('selectPreferenceFilter'),
      filterGlassSelect = document.getElementById('selectGlassFilter'),
      resultsContainer = document.getElementById('results'),
      searchButton = document.querySelector('[type="submit"]');
let query,
    path;
    

// Get values from form elements.
inputSelect?.addEventListener('change', function() {
  if (isValidInput(this.type, this, this.value)) {
    query = this.value;
  }
});
filterSelect?.addEventListener('change', function() {
  if (isValidInput(this.type, this, this.value)) {
    switch (this.value) {
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

    switch (this.value) {
      case 'name':
      case 'firstLetter':
      case 'ingredient':
        showInput(this.value, inputSelect, [filterPrefSelect, filterGlassSelect]);
        break;
      case 'alcoholic':
        showInput(this.value, filterPrefSelect, [inputSelect, filterGlassSelect]);
        break;
      case 'glass':
        showInput(this.value, filterGlassSelect, [filterPrefSelect, inputSelect])
    }
  }
});
filterPrefSelect?.addEventListener('change', function() {
  if (isValidInput(this.type, this, this.value)) {
    query = this.value;
  }
});
filterGlassSelect?.addEventListener('change', function() {
  if (isValidInput(this.type, this, this.value)) {
    query = this.value;
  }
});

// Click and call the API.
searchButton?.addEventListener('click', async (e) =>{
  e.preventDefault();
  isValidInput(inputSelect.type, inputSelect, inputSelect.value);
  isValidInput(filterSelect.type, filterSelect, filterSelect.value);
  // Clear out the container before the next query.
  resultsContainer.innerText = '';
  try {
    const results = await doApiRequest(path, query);
    const drinks = results['drinks'];
 
    // Generate the unordered list element.
    const drinkList = document.createElement('ul');
    resultsContainer.prepend(drinkList);

    // Get drinks and populate with results.
    drinks.forEach((drink) => {
      const getDrink = new Drink({
          id: drink.idDrink,
          name: drink.strDrink,
          thumb: drink.strDrinkThumb,
        },
        drinkList
      );
      getDrink.generateDrink();
      getDrink.getDrinkName();
    });
  
  } catch(e) {
    resultsContainer.innerText = 'No data found, please make a selection or try another search.';
    console.error('Error', e);
  }
})


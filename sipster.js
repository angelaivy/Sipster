'use strict';

import { searchDrinks  } from './search.js';
import { isValidInput, showInput  } from './validation.js';
import { Drink } from './Drink.js';

const inputSelect = document.getElementById('searchInput'),
      filterSelect = document.getElementById('selectFilter'),
      filterPrefSelect = document.getElementById('selectPreferenceFilter'),
      filterGlassSelect = document.getElementById('selectGlassFilter'),
      resultsContainer = document.getElementById('results'),
      searchButton = document.querySelector('[type="submit"]'),
      detailsContainer = document.querySelector('main#drinkDetails');
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
  // Clear out the container before the next query.
  resultsContainer.innerText = '';
  const results = await searchDrinks(path, query);
  const drinks = results['drinks'];
  // If there are valid results display the list - should be an array.
  if (Array.isArray(drinks)) {
    // Generate the unordered list element.
    const drinkList = document.createElement('ul');
    resultsContainer.prepend(drinkList)
    // Get drinks and populate with results.
    drinks.forEach((drink) => {
      const getDrink = new Drink({
          name: drink.strDrink,
          thumb: drink.strDrinkThumb,
        },
        drinkList
      );
      getDrink.generateDrink();
      getDrink.getDrinkName();
    });
  } else {
    resultsContainer.innerText = 'No data found, try another search.';
  }
})

// Populate details container on details page.
if (detailsContainer) {
  const clickedDrinkName = localStorage.getItem('selectedDrink');
  let selectedDrinks = [];
  try {
    // There could be multiple drinks that use name.
    const results = await searchDrinks('search.php?s=', `${clickedDrinkName}`);
    selectedDrinks = results['drinks'];
  } catch(e) {
    console.log('Drink query invalid.');
  }

  // If there are valid results display the list - should be an array.
  if (Array.isArray(selectedDrinks)) {
    selectedDrinks.forEach((selectedDrink) => {
      let ingredients = [];
      let measurements = [];

      // Get the ingredients/measurements if they have a value.
      for (const key in selectedDrink) {
        if (key.startsWith('strIngredient') && selectedDrink[key]) {
          ingredients.push(selectedDrink[key]);
        }
        if (key.startsWith('strMeasure') && selectedDrink[key]) {
          measurements.push(selectedDrink[key])
        }
      }

      const ingredientsWithMeasurements = ingredients.map((item, index) => {
        return `${measurements[index]} ${item}`
      })

      const getRecipe = new Drink({
          name: selectedDrink.strDrink,
          thumb: selectedDrink.strDrinkThumb,
          glass: selectedDrink.strGlass,
          instructions: selectedDrink.strInstructions,
        },
        document.querySelector('#drinkDetails')
      )
      for (const key in ingredientsWithMeasurements) {
        getRecipe.addIngredient(ingredientsWithMeasurements[key]);
      }
      getRecipe.generateRecipe();
    });
  }
}
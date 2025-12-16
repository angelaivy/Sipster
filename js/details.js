'use strict';

import { doApiRequest  } from './api.js';
import { Drink } from './Classes/Drink.js';
import { FavoritesManager } from './Classes/FavoritesManager.js';

async function populateDetailsPage() {
  const detailsContainer = document.querySelector('#drinkDetails');
  // Populate details container on details page.
  if (detailsContainer) {
    const clickedDrinkId = localStorage.getItem('selectedDrink');
    let selectedDrinks = [];
    try {
      const results = await doApiRequest('lookup.php?i=', `${clickedDrinkId}`);
      // Even though we are only requesting one drink, 
      // the API will return an array with one item.
      selectedDrinks = results['drinks'];
    } catch(e) {
      console.log(`Unable to look up drink id. ${clickedDrinkId}`);
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
          // Sometimes the ingredients to measurements don't match up. 
          // Avoid undefined in these cases.
          const measurement =  measurements[index] ?? '';
          const ingredient = item ?? '';
          return `${measurement} ${ingredient}`
        })

        // Generate the recipe output for each drink.
        const getRecipe = new Drink({
            id: selectedDrink.idDrink,
            name: selectedDrink.strDrink,
            thumb: selectedDrink.strDrinkThumb,
            glass: selectedDrink.strGlass,
            instructions: selectedDrink.strInstructions,
          },
          detailsContainer,
        )
        for (const key in ingredientsWithMeasurements) {
          getRecipe.addIngredient(ingredientsWithMeasurements[key]);
        }
        getRecipe.generateRecipe();
        const favoritesManager = new FavoritesManager(getRecipe.id, getRecipe.name);
        favoritesManager.addToFavorites();
      });
    }
  }
}
populateDetailsPage();


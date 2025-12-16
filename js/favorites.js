'use strict';

import { doApiRequest  } from './api.js';
import { Drink } from './Classes/Drink.js';
import { FavoritesManager } from './Classes/FavoritesManager.js';

function populateFavoritesPage() {
  const favoritesContainer = document.querySelector('main#favoriteSips');
  // Populate fave drinks container on favorites page.
  if (favoritesContainer) {
    const getFavorites = localStorage.getItem('favoriteDrinks');
    const favoriteDrinks = JSON.parse(getFavorites) || [];
    // Generate the unordered list element.
      const drinkList = document.createElement('ul');
      favoritesContainer.append(drinkList);

    favoriteDrinks.forEach(async (fave) => {
      try {
          const results = await doApiRequest('search.php?s=', `${fave}`);
          const drinks = results['drinks'];
      
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
            const favoritesManager = new FavoritesManager(getDrink.id, getDrink.name);
            favoritesManager.removeFromFavorites();
          });
        
        } catch(e) {
          favoritesContainer.innerText = 'No data found, please make a selection or try another search.';
          console.error('Error', e);
        }
    })
  }
}
populateFavoritesPage();

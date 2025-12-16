export class FavoritesManager {
  constructor(id) {
    this.id = id;
  }

  // Add drink to favorites.
  addToFavorites() {
    const btn = `
      <div class="addToFavorites">
        <button id="btn-${this.id}" class="favoritesBtn">Add to favorites</button>
      </div>
    `
    document.querySelector(`#drink-${this.id}`).insertAdjacentHTML('beforeend', btn);
    const addToFavesBtn = document.getElementById(`btn-${this.id}`);

    // Get class buttons by their ID.
    const favoritesBtn = document.querySelector(`#btn-${this.id}`);
    const existingFaves = localStorage.getItem('favoriteDrinks');
    const favesArr = JSON.parse(existingFaves) || [];
    favoritesBtn.addEventListener('click', () => {
      // Because localStorage is string data, we need to modify it to be an 
      // array to push values to, and then parse it back into a string for storing.
      if (!favesArr.includes(this.id)) {
        favesArr.push(this.id);
        const updatedFaves = JSON.stringify(favesArr);
        localStorage.setItem('favoriteDrinks', updatedFaves);
        addToFavesBtn.innerText = 'Added to favorites';
        addToFavesBtn.setAttribute('disabled', true);
      }
    })
    // Persist state.
    if (favesArr.includes(this.id)) {
      addToFavesBtn.innerText = 'Added to favorites';
      addToFavesBtn.setAttribute('disabled', true);
    }
  }

  removeFromFavorites() {
    const btnExists = document.querySelector(`#btn-${this.id}`);
    if (!btnExists) {
      const btn = `
      <div class="removeFromFavorites">
        <button id="btn-${this.id}" class="favoritesBtn">Remove from favorites</button>
      </div>
    `
      const favoritesItem = document.querySelector(`#detailItem-${this.id}`);
      favoritesItem.insertAdjacentHTML('beforeend', btn);
      const favoritesBtn = favoritesItem.querySelector(`#btn-${this.id}`);
      if (favoritesBtn) {
        favoritesBtn.addEventListener('click', (e) => {
          const existingFaves = localStorage.getItem('favoriteDrinks');
          // Because localStorage is string data, we need to modify it to be an 
          // array so we can remove the selected drink, and then parse
          // it back into a string for storing.
          const favesArr = JSON.parse(existingFaves || '[]');
          const updatedArr = favesArr.filter((item) => {
            return item !== this.id;
          })
          const updatedFaves = JSON.stringify(updatedArr);
          localStorage.setItem('favoriteDrinks', updatedFaves);
          // Remove the drink from favorites.
          document.querySelector(`#detailItem-${this.id}`).remove();
        })
      }
    }
  }
}
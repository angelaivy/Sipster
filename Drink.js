export class Drink {
  constructor(details, container) {
    Object.assign(this, details);
    this.ingredients = [];
    this.container = container;
  }

  // Basic details for list view.
  generateDrink() {
    // Checking if the drink exists first to avoid populating the list twice with the same drink.
    const drinkExists = document.getElementById(`detailItem-${this.id}`) ? true : false;
    if (!drinkExists) {
      const detailList = `
        <li id="detailItem-${this.id}" class="detailItem">
          <a href="details.html">
            <h3>${this.name}</h3>
            <img src="${this.thumb}/small" alt=""/>
          </a>
        </li>
      `
      this.container.insertAdjacentHTML('afterbegin', detailList);
    }
  }

  // Full recipe.
  generateRecipe() {
    const detailRecipe = `
      <div id="drink-${this.id}" class="detailRecipe">
        <h2>${this.name}</h2>
        <img src="${this.thumb}/small" alt=""/>
        
        <h3>What you'll need</h3>
        <ul class="ingredients">
          <li>${this.glass}</li>
        </ul>

        <h3>Instructions</h3>
        <p>${this.instructions}</p>
      </div>
    `
    // Generate the ingredients and measurements as list items.
    this.container.insertAdjacentHTML('beforeend', detailRecipe);
    const detailRecipeContainer = document.querySelector('.detailRecipe');
    const glass = detailRecipeContainer.querySelector('.ingredients > li:first-child');
    this.ingredients.forEach((ingredient) => {
      const newIngredient = `<li>${ingredient}</li>`;
      glass.insertAdjacentHTML('beforeend', newIngredient);
    });
  }

  // Add ingredients + measurements to the array.
  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  // Get drink name and save in localstorage for later use.
  getDrinkName() {
    const drinkLink = document.querySelector(`#detailItem-${this.id} a`);
    drinkLink.addEventListener('click', () => {
      localStorage.setItem('selectedDrink', this.name);
    })
  }
}
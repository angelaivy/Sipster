export class Drink {
  constructor(details, container) {
    Object.assign(this, details);
    this.ingredients = [];
    this.container = container;
  }

  // Basic details for list view.
  generateDrink() {
    const detailList = `
      <li class="detailList">
        <a href="details.html">
          <h3>${this.name}</h3>
          <img src="${this.thumb}/small" alt=""/>
        </a>
      </li>
    `
    
    this.container.insertAdjacentHTML('afterbegin', detailList);
  }

  // Full recipe.
  generateRecipe() {
    const detailRecipe = `
      <div class="detailRecipe">
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
    const drinkLink = document.querySelector('.detailList a');
    drinkLink.addEventListener('click', async (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const name = anchor.querySelector('h3').innerText;
        localStorage.setItem('selectedDrink', name);
      }
    })
  }
}
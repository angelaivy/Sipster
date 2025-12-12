import { isValidInput } from './validation.js'
 // Select filter, save value on change
// Type user input, save value on change
// Click search button
// - validate that filter is selected, 
// - validate that input has value
// - take values and build the endpoint path and query
// - searchDrinks(query)
//  - make the API call with the endpoint and return response.
//  - populate results container with drinnks previews
//  - if no results, show error to user
// Drink preview is Image and Name, linked 
describe("Filter and Search", function() {
    let mockInputElement,
        mockSelectElement,
        mockErrorElement,
        parentDiv;

    beforeAll(function() {
        parentDiv = document.createElement('div');

        mockErrorElement = document.createElement('div');
        mockErrorElement.className = 'errorMessage';

        mockInputElement = document.createElement('input');
        mockInputElement.id = 'searchInput';

        mockSelectElement = document.createElement('select');
        mockSelectElement.id = 'selectFilter';

        parentDiv.appendChild(mockSelectElement);
        parentDiv.appendChild(mockInputElement);
        parentDiv.appendChild(mockErrorElement);
        document.body.appendChild(parentDiv);
    });

    afterAll(function() {
        parentDiv.remove();
        mockInputElement.remove();
        mockSelectElement.remove();
        mockErrorElement.remove();
    });

    it("should return false and show error when input is invalid", function() {
        const invalidInputs = ['', '!', '@#$%'];
        invalidInputs.forEach(input => {
            const result = isValidInput(mockInputElement.type, mockInputElement, input);
            expect(result).toBe(false);
            expect(mockErrorElement.classList.contains('show')).toBe(true);
            expect(mockErrorElement.classList.contains('hide')).toBe(false);
        });
    });

    it("should return true and hide error when input is valid", function() {
        const validInputs = ['margarita', 'a', 'gin'];
        validInputs.forEach(input => {
            const result = isValidInput(mockInputElement.type, mockInputElement, input);
            expect(result).toBe(true);
            expect(mockErrorElement.classList.contains('show')).toBe(false);
            expect(mockErrorElement.classList.contains('hide')).toBe(true);
        });
    });

    it("should return false and show error when select is invalid", function() {
        const result = isValidInput(mockSelectElement.type, mockSelectElement, '');
        expect(result).toBe(false);
        expect(mockErrorElement.classList.contains('show')).toBe(true);
        expect(mockErrorElement.classList.contains('hide')).toBe(false);
    });

     it("should return true and show error when select is invalid", function() {
        const result = isValidInput(mockSelectElement.type, mockSelectElement, 'name');
        expect(result).toBe(true);
        expect(mockErrorElement.classList.contains('show')).toBe(false);
        expect(mockErrorElement.classList.contains('hide')).toBe(true);
    });
});







// // describe("Filter and Search Suite", function() {
// //     it("should return results containing 'margarita' when name filter is selected", async function() {
// //        const results = await searchDrinks('margarita');
// //         expect(results).toBeDefined();
// //         expect(results.length).toBeGreaterThan(0);
// //         results.forEach(drink => {
// //             expect(drink.strDrink.toLowerCase()).toContain('margarita');
// //         });
// //     });

// //      it("should return results containing 'vodka' when ingredient filter is selected", async function() {
// //        const results = await searchDrinks('vodka');
// //         expect(results).toBeDefined();
// //         expect(results.length).toBeGreaterThan(0);
// //         results.forEach(drink => {
// //             const ingredients = [];
// //             for (let i = 1; i <= 15; i++) {
// //                 const ingredient = drink[`strIngredient${i}`];
// //                 if (ingredient) ingredients.push(ingredient.toLowerCase());
// //             }
// //             expect(ingredients).toContain('vodka');
// //         });    
// //     });

// //     it("should return a list of results with name and image", async function() {
// //         const results = await searchDrinks('margarita');
// //         expect(results).toBeDefined();
// //         expect(results.length).toBeGreaterThan(0);
// //         results.forEach(drink => {
// //             expect(drink.strDrink).toBeDefined();
// //             expect(drink.strDrinkThumb).toBeDefined();
// //         });
// //     });

// //     it("should display an error message when no results are found", async function() {
// //         const results = await searchDrinks('nonexistentdrinkname');
// //         expect(results).toBeNull();
// //         expect(getResultsContainer().innerHTML).toContain('No results found');
// //     });

// //     it("should display a validation error when input is invalid", function() {
// //         const invalidInputs = ['', '!', '123', '@#$%'];
// //         invalidInputs.forEach(input => {
// //             const validationError = validateInput(input);
// //             expect(validationError).toBe('Please enter a valid search term.');
// //         });
// //     });
// // });

// // describe("Drink Details Suite", function() {
// //     it("should display drink details when a drink is clicked from results", async function() {
// //       const results = await searchDrinks('margarita');
// //       const firstDrink = results[0];
// //       displayDrinkDetails(firstDrink.idDrink);
// //       const detailsContainer = getDrinkDetailsContainer();
// //       expect(detailsContainer).toBeDefined();
// //       expect(detailsContainer.innerHTML).toContain(firstDrink.strDrink);
// //       expect(detailsContainer.innerHTML).toContain(firstDrink.strInstructions);
// //       expect(detailsContainer.innerHTML).toContain(firstDrink.strDrinkThumb);
// //       expect(detailsContainer.innerHTML).toContain(firstDrink.strIngredient1);
// //       expect(detailsContainer.innerHTML).toContain(firstDrink.strGlass);
// //       expect(detailsContainer.innerHTML).toContain(firstDrink.Measure1);
// //     });
// // });

// // describe("Random Drink Suite", async function() {
// //     it("should display a random drink when the random drink button is clicked", function() {
// //         clickRandomDrinkButton();
// //         const detailsContainer = getDrinkDetailsContainer();
// //         expect(detailsContainer).toBeDefined();
// //         expect(detailsContainer.innerHTML).toContain('strDrink');
// //         expect(detailsContainer.innerHTML).toContain('strInstructions');
// //         expect(detailsContainer.innerHTML).toContain('strDrinkThumb');
// //         expect(detailsContainer.innerHTML).toContain('strIngredient1');
// //         expect(detailsContainer.innerHTML).toContain('strGlass');
// //         expect(detailsContainer.innerHTML).toContain('strMeasure1');
// //     });
// // }); 

// // describe("Favorites Suite", function() {
// //     it("should add a drink to favorites list", async function() {
// //         const results = await searchDrinks('margarita');
// //         const firstDrink = results[0];
// //         addToFavorites(firstDrink.idDrink);
// //         const favoritesList = getFavoritesList();
// //         expect(favoritesList).toBeDefined();
// //         expect(favoritesList.length).toBeGreaterThan(0);
// //         const isInFavorites = favoritesList.some(drink => drink.idDrink === firstDrink.idDrink);
// //         expect(isInFavorites).toBeTrue();
// //     });

// //     it("should remove a drink from favorites list", function() {
// //         const favoritesListBefore = getFavoritesList();
// //         const drinkToRemove = favoritesListBefore[0];
// //         removeFromFavorites(drinkToRemove.idDrink);
// //         const favoritesListAfter = getFavoritesList();
// //         const isInFavorites = favoritesListAfter.some(drink => drink.idDrink === drinkToRemove.idDrink);
// //         expect(isInFavorites).toBeFalse();
// //     });
// // });

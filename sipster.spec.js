import { isValidInput } from './validation.js';
import { doApiRequest } from './api.js';
import { Drink } from './Drink.js';
import { FavoritesManager } from './FavoritesManager.js';

describe("Filter and Search", function() {
    it('should return false for invalid input', function() {
        expect(isValidInput('text', null, '')).toBe(false);
        expect(isValidInput('text', null, '!')).toBe(false);
        expect(isValidInput('select-one', null, '')).toBe(false);
    });

    it('should return true for valid input', function() {
        expect(isValidInput('text', null, 'margarita')).toBe(true);
        expect(isValidInput('select-one', null, 'name')).toBe(true);
    });

    it('should return results when name filter is selected', async function() {
        const searchPath = 'search.php?s=';
        const query = 'margarita';
        const results = await doApiRequest(searchPath, query);
        const drinks = results['drinks'];
        expect(results).toBeDefined();
        expect(drinks.length).toBeGreaterThan(0);
        drinks.forEach(drink => {
            expect(drink.strDrink.toLowerCase()).toContain('margarita');
        });
    });

    it('should return null when drink doesn\'t exist.', async function() {
        const searchPath = 'search.php?s=';
        const query = 'nonexistentdrinkname';
        const results = await doApiRequest(searchPath, query);
        const drinks = results['drinks'];
        expect(drinks).toBeNull();
    });
});

describe('Drink Details', function() {
    let detailList;
    beforeEach(() => {
        const container = document.createElement('div');
        container.id = 'container';
        document.body.append(container);
        detailList = document.getElementById('container');
    });
    afterEach(() => {
        detailList.remove();
    });

    it('should have expected drink list item html', function() {
        const drink = new Drink({
                id: 1234,
                name: 'margarita',
                thumb: 'https://www.thecocktaildb.com/images/media/drink/dztcv51598717861.jpg',
            },
            detailList,
        )
        drink.generateDrink();
        expect(detailList.innerHTML).toContain('<li id="detailItem-1234" class="detailItem">');
        expect(detailList.innerHTML).toContain('<h3>margarita</h3>');
        expect(detailList.innerHTML).toContain('<img src="https://www.thecocktaildb.com/images/media/drink/dztcv51598717861.jpg/small" alt="">');
    });

    it('should have expected drink recipe html', function() {
        const drink = new Drink({
                id: 1234,
                name: 'Mimosa',
                thumb: 'https://www.thecocktaildb.com/images/media/drink/juhcuu1504370685.jpg',
                glass: 'champagne flute',
                instructions: 'pour champagne until the glass is mostly full, splash orange juice'
            },
            detailList,
           
        )
        drink.addIngredient('champange');
        drink.addIngredient('orange juice');
        drink.generateRecipe();
               
        expect(detailList.innerHTML).toContain('<div id="drink-1234" class="detailRecipe">');
        expect(detailList.innerHTML).toContain('<h2>Mimosa</h2>');
        expect(detailList.innerHTML).toContain('<img src="https://www.thecocktaildb.com/images/media/drink/juhcuu1504370685.jpg/small" alt="">');
         expect(detailList.innerHTML).toContain('<p>pour champagne until the glass is mostly full, splash orange juice</p>');
        expect(detailList.innerHTML).toContain('<li>champagne flute</li>');
        expect(detailList.innerHTML).toContain('<li>champange</li>');
        expect(detailList.innerHTML).toContain('<li>orange juice</li>');
    });

    it('should add drink name to localStorage', function() {
         const drink = new Drink({
                id: 1234,
                name: 'Mimosa',
                thumb: 'https://www.thecocktaildb.com/images/media/drink/juhcuu1504370685.jpg',
            },
            detailList,
        )
        drink.generateDrink();
        drink.getDrinkName();
        const drinkLink = document.getElementById('detailItem-1234').firstElementChild;
        drinkLink.addEventListener('click', (e) => {
            e.preventDefault();
        })
        drinkLink.click();
        expect(localStorage.getItem('selectedDrink')).toBe('Mimosa');
    })
});

describe('Favorites Manager', function() {
    let detailList;
    beforeEach(() => {
        const container = document.createElement('div');
        container.id = 'container';
        document.body.append(container);
        detailList = document.getElementById('container');
    });
    afterEach(() => {
        detailList.remove();
    });

    it('adds drink to favorites', function() {
        const drink = new Drink({
                id: 1234,
                name: 'Mimosa',
                thumb: 'https://www.thecocktaildb.com/images/media/drink/juhcuu1504370685.jpg',
                glass: 'champagne flute',
                instructions: 'pour champagne until the glass is mostly full, splash orange juice'
            },
            detailList,
        )
        drink.addIngredient('champange');
        drink.addIngredient('orange juice');
        drink.generateRecipe();
        const favoritesManager = new FavoritesManager(drink.id, drink.name);
        favoritesManager.addToFavorites();
        document.getElementById(`btn-${drink.id}`).click();
        expect(localStorage.getItem('favoriteDrinks')).toContain('Mimosa');
    })

    it('removes drink from favorites', function() {
        const drink = new Drink({
                id: 1234,
                name: 'Mimosa',
                thumb: 'https://www.thecocktaildb.com/images/media/drink/juhcuu1504370685.jpg',
            },
            detailList,
        )
        drink.generateDrink();
        const favoritesManager = new FavoritesManager(drink.id, drink.name);
        favoritesManager.removeFromFavorites();
        document.getElementById(`btn-${drink.id}`).click();
        expect(localStorage.getItem('favoriteDrinks')).not.toContain('Mimosa');
    })
});

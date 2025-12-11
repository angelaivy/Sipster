# Technical Design Document

## Project Requirements
 
1. Your project must be interactive (i.e. must have event listeners).  The user must be able to interact with the document with the mouse or keyboard and have the document change / update.
2. Your project must include 4 of the 6 following features (but may include more):
    1. One or more Classes (must use static methods and/or prototype methods)
    2. Write testable code, use Jasmine unit tests
    3. One or more timing functions
    4. One or more fetch requests to a 3rd party API
    5. Sets, updates, or changes local storage
    6. Contains form fields, validates those fields

## Outline

**Name**: Sipster: search, discover, and save your favorite cocktails.

**Description**: Users can discover drinks and build their own favorites list. Filter by name, first letter, ingredient name, get a random cocktail, alcoholic or non-alcoholic, glass type.

Specs:  
- TDD: unit tests first using jest
  - Satisfies #2.2
- Fetches https://www.thecocktaildb.com/api.php for data
  - Developer key is 1 (this is listed on their website)
  - Try/Catch with error handling
  - Satisfies #2.4
- User selection for filter
  - Whatever the filter value is will update the API call for that category
  - Satisfies #1
- User input for filter value 
  - Validatation for input: non-empty, filter selected 
  - Satisfies #1, #2.6
- Button to enter selection
  - Satisfies #1
- Separate button to generate a random cocktail
  - Satisfies #1
- A list populates with the data 
  - Name, Glass, Instructions, Glass, Image, Ingrediants, Measurements
  - Uses classes: Drink Model to handle drink output and formatting, Favorites Manager to handle favorite drinks section.
  - Satisfies #2.1
- Add to favorites button with localstorage
  - Satisfies #1, #2.5
- Favorites Section, select the name and the drink shows
 - Remove drink from favorites
- Bonus (if time) - the API provides localized instructions. Have a language selector to change the localized instructions. 

## UX

Name, tagline

A user sees a select option and a text input with a search button. There is a short menu: home, favorites. Description to let the user know what to do and what to expect.

They add their selection and hit search.

A list populates with Cocktail name, image

The user can click into the drink for the full view of the cocktail with instructions, measurments and ingrediants, glass ,etc. 


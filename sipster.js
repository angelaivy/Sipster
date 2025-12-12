'use strict';

import { isValidInput } from './validation.js'

const initSipster= () => {
  const inputSelect = document.getElementById('searchInput');
  const filterSelect = document.getElementById('selectFilter');

  // Get value from the input.
  inputSelect.addEventListener('change', () => {
    const textValue = inputSelect.value;
    console.log(textValue);
    
    if (isValidInput(inputSelect.type, inputSelect, textValue)) {
      // do stuff
    }
  });

  // Get values from the filter.
  filterSelect.addEventListener('change', () => {
    const selection = filterSelect.value;
    console.log(selection);
    
    if (isValidInput(filterSelect.type, filterSelect, selection)) {
      // do stuff
    }
  });
}

document.addEventListener('DOMContentLoaded', initSipster);
export { initSipster };


const isValidInput = (type, el, value) => {

  const errorMessageContainer =  el?.parentElement?.querySelector('.errorMessage');

  if (type === 'select-one') {
    if (value) {
      errorMessageContainer && hideEl(errorMessageContainer);
      el.classList.remove('error');
      return true;
    } else {
      errorMessageContainer && showEl(errorMessageContainer);
      el.classList.add('error');
      return false;
    }
  }

  if (type === 'text') {
    // Text input should have 1 character or more and should not contain @#$%!*&().
    const invalidRegex = /[@#$%!*&()]/;
    if (invalidRegex.test(value)) {
      errorMessageContainer && showEl(errorMessageContainer);
      el.classList.add('error');
      return false;
    } else {
      errorMessageContainer && hideEl(errorMessageContainer);
      el.classList.remove('error');
      return true;
    }
  }
}

const showInput = (value, inputToShow, inputsToHide) => {
  // Reset and hide.
  inputsToHide.forEach((input) => {
    hideEl(input.parentElement);
  })

  if (value ) {
    showEl(inputToShow?.parentElement);
  } 
}

function showEl(el) {
  el.classList.remove('hide');
  el.classList.add('show');
}

function hideEl(el) {
  el.classList.remove('show');
  el.classList.add('hide');
}

export { isValidInput, showInput }
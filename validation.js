const isValidInput = (type, el, value) => {
const errorMessageContainer =  el.parentElement.querySelector('.errorMessage');

  if (type === 'select-one') {
    if (value) {
      errorMessageContainer.classList.remove('show');
      errorMessageContainer.classList.add('hide');
      return true;
    } else {
      errorMessageContainer.classList.remove('hide');
      errorMessageContainer.classList.add('show');
      return false;
    }
  }

  if (type === 'text') {
    // Text input should have 1 character or more and should not contain @#$%!*&().
    const regex = /^[^@#$%!*&()]+$/;
    if (value.match(regex)) {
      errorMessageContainer.classList.remove('show');
      errorMessageContainer.classList.add('hide');
      return true;
    } else {
      errorMessageContainer.classList.remove('hide');
      errorMessageContainer.classList.add('show');
      return false;
    }
  }
}

export { isValidInput }
let dateIsValid = false;
let nameIsValid = false;
let descriptionIsValid = false;

function setValid(type, value) {
  if (type === 'date') {
    dateIsValid = value;
  } else if (type === 'name') {
    nameIsValid = value;
  } else if (type === 'description') {
    descriptionIsValid = value;
  }
}

function getValid() {
  return dateIsValid && nameIsValid && descriptionIsValid;
}

export { setValid, getValid, dateIsValid, nameIsValid, descriptionIsValid };
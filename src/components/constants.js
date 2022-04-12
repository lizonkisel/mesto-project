const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
    'Content-Type': 'application/json'
  }
}

const configForFormValidator = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  errorClass: 'form__item_invalid'
}

export {apiConfig, configForFormValidator}

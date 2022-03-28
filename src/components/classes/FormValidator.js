// const validationConfig = {
//   formSelector: '.form',
//   inputSelector: '.form__item',
//   submitButtonSelector: '.form__button-submit',
//   inactiveButtonClass: 'form__button-submit_disabled',
//   errorClass: 'form__item_invalid'
// }

export default class FormValidator {
  constructor({config}) {
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.errorClass = config.errorClass;
  }

    /* Запустить процесс выбора форм и добавления слушателей полям  */

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this.formSelector));
    forms.forEach(function(form) {
      setInputListeners(form);
      form.addEventListener('submit', function(evt) {
        evt.preventDefault();
      })
    })
  }

    /* Добавить слушатели полям ввода формы */

  setInputListeners(form) {
    const inputs = Array.from(form.querySelectorAll(this.inputSelector));
    toggleButtonState(form, inputs);
    inputs.forEach(function(input) {
      input.addEventListener('input', function(evt) {
        checkValidation(form, input);
        toggleButtonState(form, inputs);
      })
    })
  }

    /* Переключить состояние кнопки "Submit" */

  toggleButtonState(form, inputs) {
    const submitButton = form.querySelector(this.submitButtonSelector);
    if (hasInvalidInput(inputs)) {
      submitButton.classList.add(this.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

    /* Проверить, есть ли среди полей невалидные */

  hasInvalidInput(inputs) {
    return inputs.some(function(input) {
      return !input.validity.valid;
    })
  }

    /* Проверить валидность поля */

  checkValidation(form, input) {
    const inputError = form.querySelector(`.${input.name}-error`);
    const inputErrorText = input.validationMessage;
    if(!input.validity.valid) {
      input.classList.add(this.errorClass);
      inputError.textContent = inputErrorText;

    } else {
      input.classList.remove(this.errorClass);
      inputError.textContent = '';
    }
  }




}

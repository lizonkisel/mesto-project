class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._sectionForm = document.querySelector(this._formElement);
    this._form = this._sectionForm.querySelector('.form');
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

    /* Запустить процесс выбора форм и добавления слушателей полям  */

  enableValidation = () => {
    this._setInputListeners();
  }

    /* Добавить слушатели полям ввода формы */

  _setInputListeners = () => {
    // const inputList = Array.from(this.form.querySelectorAll(this._inputSelector));
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidation(input);
        this._toggleButtonState();
      })
    })
  }

    /* Переключить состояние кнопки "Submit" */

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

    /* Проверить, есть ли среди полей невалидные */

  _hasInvalidInput = () => {
    return this._inputList.some(function(input) {
      return !input.validity.valid;
    })
  }

    /* Проверить валидность поля */

  _checkValidation = (input) => {
    const inputError = this._form.querySelector(`.${input.name}-error`);
    const inputErrorText = input.validationMessage;
    if(!input.validity.valid) {
      input.classList.add(this._errorClass);
      inputError.textContent = inputErrorText;
    } else {
      input.classList.remove(this._errorClass);
      inputError.textContent = '';
    }
  }

    /* Сбросить ошибки валидации после открытия поп-апа с формой */

  resetValidationErrors() {
    this._inputList.forEach((input) => {
      this._hideError(input);
    })
    this._toggleButtonState();
  }

  /* Удалить ошибку и класс с ошибкой с поля */

  _hideError(input) {
    input.classList.remove(this._errorClass);
    const inputError = this._form.querySelector(`.${input.name}-error`);
    inputError.textContent = '';
  }

};

export {FormValidator};

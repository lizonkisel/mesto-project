class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    // this._hendler = hendler;
    // this.popupSelector = popupSelector;

    this._sectionForm = document.querySelector('.popup_opened');
    // this._sectionForm = document.querySelector(this._formSelector);
    this._form = this._sectionForm.querySelector('.form');
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    // this._form.addEventListener('submit', function(evt) {
    //   evt.preventDefault();
    // })
  }

  // _getForm = () => {
    // const sectionForm = document.querySelector(this.popupSelector);
    // const form = this._sectionForm.querySelector('.form');
    // this._form = form;
    // return this.form;
  // }

    /* Запустить процесс выбора форм и добавления слушателей полям  */

  enableValidation = () => {

    // console.log('Проверка валидации' + this.submitButtonSelector);

    // this._getForm();
    this._setInputListeners();
    // this._form.addEventListener('submit', function(evt) {
    //   evt.preventDefault();
    // })



    //   const forms = Array.from(document.querySelectorAll(this.formSelector));
    //   forms.forEach((form) => {
    //     this.setInputListeners(form);
    //     form.addEventListener('submit', function(evt) {
    //       evt.preventDefault();
    //     })
    //   })
    }



    /* Добавить слушатели полям ввода формы */

  _setInputListeners = () => {
    // const inputList = Array.from(this.form.querySelectorAll(this._inputSelector));
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this._checkValidation(this._form, input);
        this._toggleButtonState(this._inputList);
      })
    })
  }

    /* Переключить состояние кнопки "Submit" */

  // toggleButtonState(form, inputs) {
  //   const submitButton = form.querySelector(this._submitButtonSelector);
  //   if (this.hasInvalidInput(inputs)) {
  //     submitButton.classList.add(this._inactiveButtonClass);
  //     submitButton.disabled = true;
  //     // console.log(submitButton);
  //   } else {
  //     submitButton.classList.remove(this._inactiveButtonClass);
  //     submitButton.disabled = false;
  //   }
  // }
  _toggleButtonState = (inputs) => {
    // const submitButton = form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputs)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      // console.log(submitButton);
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

  // checkValidation(form, input) {
  //   const inputError = form.querySelector(`.${input.name}-error`);
  //   const inputErrorText = input.validationMessage;
  //   if(!input.validity.valid) {
  //     input.classList.add(this._errorClass);
  //     inputError.textContent = inputErrorText;

  //   } else {
  //     input.classList.remove(this._errorClass);
  //     inputError.textContent = '';
  //   }
  // }

  _checkValidation = (form, input) => {
    const inputError = form.querySelector(`.${input.name}-error`);
    const inputErrorText = input.validationMessage;
    if(!input.validity.valid) {
      input.classList.add(this._errorClass);
      inputError.textContent = inputErrorText;

    } else {
      input.classList.remove(this._errorClass);
      inputError.textContent = '';
    }
  }

};

export {FormValidator};

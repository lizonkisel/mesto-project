class FormValidator {
  constructor(config, popupSelector) {
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.errorClass = config.errorClass;
    this.popupSelector = popupSelector;
  }

  _getForm = () => {
    const sectionForm = document.querySelector(this.popupSelector);
    const form = sectionForm.querySelector('.form');
    this.form = form;
    // return this.form;
  }

    /* Запустить процесс выбора форм и добавления слушателей полям  */

  // enableValidation() {
  //   const forms = Array.from(document.querySelectorAll(this.formSelector));
  //   forms.forEach((form) => {
  //     this.setInputListeners(form);
  //     form.addEventListener('submit', function(evt) {
  //       evt.preventDefault();
  //     })
  //   })
  // }

  enableValidation() {

    // console.log('Проверка ваидации' + this.submitButtonSelector);

    this._getForm();
    this.setInputListeners();
    this.form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })

    //   const forms = Array.from(document.querySelectorAll(this.formSelector));
    //   forms.forEach((form) => {
    //     this.setInputListeners(form);
    //     form.addEventListener('submit', function(evt) {
    //       evt.preventDefault();
    //     })
    //   })
    }

    /* Добавить слушатели полям ввода формы */

  setInputListeners() {
    const inputs = Array.from(this.form.querySelectorAll(this.inputSelector));
    this.toggleButtonState(this.form, inputs);
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this.checkValidation(this.form, input);
        this.toggleButtonState(this.form, inputs);
      })
    })
  }

    /* Переключить состояние кнопки "Submit" */

  toggleButtonState(form, inputs) {
    const submitButton = form.querySelector(this.submitButtonSelector);
    if (this.hasInvalidInput(inputs)) {
      submitButton.classList.add(this.inactiveButtonClass);
      submitButton.disabled = true;
      // console.log(submitButton);
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

};

export {FormValidator};

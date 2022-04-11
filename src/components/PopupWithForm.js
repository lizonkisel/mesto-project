import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.form = this.popup.querySelector('.form');
    this._buttonSubmit = this.form.querySelector('.form__button-submit');
    this.inputs = Array.from(this.form.querySelectorAll('.form__item'));
    // this.inputsValues = {};
    // this.inputsValues = this._getInputValues();
  }


  changeSubmitText(isLoading) {
    if (isLoading === true) {

      this._buttonSubmit.textContent = "Сохранение...";

      // if (this.popupSelector === '.popup_new-place') {
      //   this.buttonSubmit.textContent = "Создание...";
      // } else {
      //   this.buttonSubmit.textContent = "Сохранение...";
      // }

    } else {

      this._buttonSubmit.textContent = "Сохранить";

      // if (this.popupSelector === '.popup_new-place') {
      //   this.buttonSubmit.textContent = "Создать";
      // } else {
      //   this.buttonSubmit.textContent = "Сохранить";
      // }

    }
  }

  _getInputValues() {
    this.inputsValues = {};
    this.inputs.forEach((input) => {
      this.inputsValues[input.name] = input.value;
    });

    return this.inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this.inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // closeWithReset() {
  //   super.close();
  //   this.form.reset();
  // }

  close() {
    super.close();
    this.form.reset();
  }

};

export {PopupWithForm};

import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this.form = this.popup.querySelector('.form');
    this.buttonSubmit = this.form.querySelector('.form__button-submit');
    this.inputs = Array.from(this.form.querySelectorAll('.form__item'));
    this.inputsValues = {};
  }

  changeSubmitText(isLoading) {
    if (isLoading === true) {

      this.buttonSubmit.textContent = "Сохранение...";

      // if (this.popupSelector === '.popup_new-place') {
      //   this.buttonSubmit.textContent = "Создание...";
      // } else {
      //   this.buttonSubmit.textContent = "Сохранение...";
      // }

    } else {

      this.buttonSubmit.textContent = "Сохранить";

      // if (this.popupSelector === '.popup_new-place') {
      //   this.buttonSubmit.textContent = "Создать";
      // } else {
      //   this.buttonSubmit.textContent = "Сохранить";
      // }

    }
  }


  _getInputValues() {
    this.inputs.forEach((input) => {
      this.inputsValues[input.name] = input.value;
    });

    return this.inputsValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('I am working');
      // this._handleSubmit();
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

import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.form = this.popup.querySelector('.form');
    this.buttonSubmit = this.form.querySelector('.form__button-submit');
    this.inputs = Array.from(this.form.querySelectorAll('.form__item'));
    this.name = this.form.querySelector('.form__item_type_name');
    this.description = this.form.querySelector('.form__item_type_work');
    this.image = this.form.querySelector('.form__item_type_image');
    this.title = this.form.querySelector('.form__item_type_title');
    this.profilePhoto = this.form.querySelector('.form__item_type_user-photo');
  }


  changeSubmitText(isLoading) {
    if (isLoading === true) {

      if (this.popupSelector === '.popup_new-place') {
        this.buttonSubmit.textContent = "Создание...";
      } else {
        this.buttonSubmit.textContent = "Сохранение...";
      }

    } else {

      if (this.popupSelector === '.popup_new-place') {
        this.buttonSubmit.textContent = "Создать";
      } else {
        this.buttonSubmit.textContent = "Сохранить";
      }

    }
  }

  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', this.handleSubmit);
  }

  closeWithReset() {
    super.close();
    this.form.reset();
  }

};

export {PopupWithForm};

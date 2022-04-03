import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
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
    const loadingText = 'Сохранение...';
    if (isLoading === true) {
      console.log(this);
      this.buttonSubmit.textContent = loadingText;
    } else {
      if (this.popupSelector === '.popup_new-place') {
        console.log(this);
        this.buttonSubmit.textContent = "Создать";
      } else {
        this.buttonSubmit.textContent = "Сохранить";
      }
    }
  }


  // собирает данные всех полей формы
  _getInputValues() {

  }

  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    this.form.reset();
    super.close();
  }

}

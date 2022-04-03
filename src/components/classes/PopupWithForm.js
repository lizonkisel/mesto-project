import {Popup} from './Popup.js';



export class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallBack}) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this.form = this.popup.querySelector('.form');
    this.inputs = Array.from(this.form.querySelectorAll('.form__item'));
    this.name = this.form.querySelector('.form__item_type_name');
    this.description = this.form.querySelector('.form__item_type_work');
    this.image = this.form.querySelector('.form__item_type_image');
    this.title = this.form.querySelector('.form__item_type_title');
    this.profilePhoto = this.form.querySelector('.form__item_type_user-photo');
  }

  changeSubmitText(isLoading) {
    const loadingText = 'Сохранение...';
    const buttonSubmit = this.popup.querySelector('.form__button-submit');
    if (isLoading === true) {
      buttonSubmit.textContent = loadingText;
    } else {
      if (this.popupSelector === '.popup_new-place') {
        buttonSubmit.textContent = "Создать";
      } else {
        buttonSubmit.textContent = "Сохранить";
      }
    }
  }


  // собирает данные всех полей формы
  _getInputValues = () => {

  }


  // должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы. formForSubmit
  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', this._submitCallBack);
  }

  close() {
    this.form.reset();
    super.close();
  }

}

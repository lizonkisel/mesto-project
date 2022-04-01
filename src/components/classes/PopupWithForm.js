import {Popup} from './Popup.js';










export default class PopupWithForm extends Popup {
  constructor() {
    super(popupSelector);

    // колбэк сабмита формы



  }

  // собирает данные всех полей формы
  _getInputValues() {

  }


  // должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {

  }

  close() {

    return super.close;

  }



}

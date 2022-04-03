import {Popup} from './Popup.js';



export class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallBack}) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
  }

  // собирает данные всех полей формы
  _getInputValues = () => {

  }


  // должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы. formForSubmit
  setEventListeners = (formForSubmit) => {

    formForSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      super._setEventListeners();
      this._submitCallBack;
    })

  }

  close() {
    return super.close();
  }



}

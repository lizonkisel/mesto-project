import {Popup} from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', this._submitCallBack);
  }
}

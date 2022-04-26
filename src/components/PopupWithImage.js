import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this.popup.querySelector('.popup__image');
    this._title = this.popup.querySelector('.popup__title');
  }

  open(image, title) {
    this._image.setAttribute('src', image);
    this._image.setAttribute('alt',  title);
    this._title.textContent = title;
    super.open();
  }

};

export {PopupWithImage};

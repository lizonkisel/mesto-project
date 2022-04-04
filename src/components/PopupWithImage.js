import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.popup.querySelector('.popup__image');
    this.title = this.popup.querySelector('.popup__title');
  }

  open(image, title) {
    this.image.setAttribute('src', image);
    this.image.setAttribute('alt',  title);
    this.title.textContent = title;
    super.open();
  }

};

export {PopupWithImage};

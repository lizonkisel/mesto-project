class Popup{
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add('popup_opened');
    this._setEventListeners();
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    console.log('Это отрабатываю я метод close in Popup');
    this.popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this.popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close(this.popup);
      }
      if (evt.target.classList.contains('popup__button-close')) {
        this.close(this.popup);
      }
    })
  }
}

export {Popup};

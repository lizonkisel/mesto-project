import {Popup} from './Popup.js';



export class PopupWithForm extends Popup {
  constructor({popupSelector, submitFormEditProfile, submitCreateNewPlace, submitEditProfilePhoto, deleteCardEveryWhere}) {
    super(popupSelector);
    this.submitFormEditProfile = submitFormEditProfile;
    this.submitCreateNewPlace = submitCreateNewPlace;
    this.submitEditProfilePhoto = submitEditProfilePhoto;
    this.deleteCardEveryWhere = deleteCardEveryWhere;


    // колбэк сабмита формы



  }

  // собирает данные всех полей формы
  _getInputValues() {

  }


  // должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {
    // submitFormHeandler.addEventListener('submit', this)

    super._setEventListeners();



  }

  close() {
    return super.close();
  }



}

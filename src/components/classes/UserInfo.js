import {popupEditProfile, popupEditProfileForm, popupEditProfileInputs, popupEditProfileName,
  popupEditProfileDescription, popupNewPlace, popupNewPlaceForm, popupNewPlaceInputs,
  popupNewPlaceImage, popupNewPlaceTitle, changePopupEditProfileData, popupDeleteCard, popupDeleteCardForm,
  profileName, profileDescription, popupEditProfilePhoto, popupEditProfilePhotoForm,
  popupEditProfilePhotoInput, profileAvatar} from '../modal.js';
import {openPopup, closePopup, changeSubmitText} from '../utils.js';
import {api, formValidator} from '../index.js';

export default class UserInfo {
  constructor() {

  }

    /* Установить данные профиля после их получения с сервера */
  setProfileData(newName) {
    profileName.textContent = newName.name;
    profileDescription.textContent = newName.about;
  }

    /* Установить новый аватар после получения с сервера */
  setAvatar(profileAvatar, avatar) {
    profileAvatar.src = avatar;
  }


    /* Сохранить данные редактирования профиля */

  submitFormEditProfile(evt) {
    evt.preventDefault();

    changeSubmitText(true, popupEditProfile);

    api.changeNameOnServer(popupEditProfileName, popupEditProfileDescription)
    .then((newName) => {
      this.setProfileData(newName);
      closePopup(popupEditProfile);
    })
    .catch(error => console.log(`Ошибка смены имени пользователя ${error}`))
    .finally(() => {
      changeSubmitText(false, popupEditProfile);
    })
  }


    /* Сохранить новое фото профиля */

  submitEditProfilePhoto(evt) {
    evt.preventDefault();

    changeSubmitText(true, popupEditProfilePhoto);

    const popupEditProfilePhotoLink = popupEditProfilePhotoInput.value;

    api.changeAvatarOnServer(popupEditProfilePhotoLink)
    .then(profileData => {
      this.setAvatar(profileAvatar, profileData.avatar);
      closePopup(popupEditProfilePhoto);
      popupEditProfilePhotoForm.reset();
      formValidator.toggleButtonState(popupEditProfilePhotoForm, [popupEditProfilePhotoInput]);
    })
    .catch(err => {console.log(err)})
    .finally(() => {
      changeSubmitText(false, popupEditProfilePhoto);
    })
  }
}

import {openPopup, closePopup, cleanTitle, changeSubmitText} from './utils.js';
import {validationConfig, toggleButtonState} from './validate.js'
import {renderCard} from './card.js';
import {changeNameOnServer, postNewPlaceOnServer, changeAvatarOnServer} from './api.js';

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoTitle = popupPhoto.querySelector('.popup__title');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.form');
const popupEditProfileName = popupEditProfile.querySelector('.form__item_type_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.form__item_type_work');
const popupEditProfileInputs = Array.from(popupEditProfile.querySelectorAll(validationConfig.inputSelector));

const popupNewPlace = document.querySelector('.popup_new-place');
const popupNewPlaceForm = popupNewPlace.querySelector('.form');
const popupNewPlaceImage = popupNewPlace.querySelector('.form__item_type_image');
const popupNewPlaceTitle = popupNewPlace.querySelector('.form__item_type_title');
const popupNewPlaceInputs = Array.from(popupNewPlaceForm.querySelectorAll(validationConfig.inputSelector));

const popupDeleteCard = document.querySelector('.popup_delete-card');
const popupDeleteCardForm = popupDeleteCard.querySelector('.form');

const popupEditProfilePhoto = document.querySelector('.popup_edit-profile-photo');
const popupEditProfilePhotoForm = popupEditProfilePhoto.querySelector('.form');
const popupEditProfilePhotoInput = popupEditProfilePhotoForm.querySelector('.form__item_type_user-photo');
const profileAvatar = document.querySelector('.profile__avatar');


  /* Наполнить поп-ап с фото */

function fillPopupPhoto(image, title) {
  cleanTitle(popupPhotoTitle);
  changeImagePopupPhoto(image, title);
  changeTitlePopupPhoto(title);
  openPopup(popupPhoto);
}

  /* Сменить изображение в поп-апе с фото */

function changeImagePopupPhoto(image, title) {
  popupPhotoImage.setAttribute('src', image);
  popupPhotoImage.setAttribute('alt',  title);
}

  /* Сменить подпись в поп-апе с фото */

function changeTitlePopupPhoto(title) {
  popupPhotoTitle.insertAdjacentText('afterbegin',  title);
}

  /* Подтянуть данные профиля в поп-ап с редактированием данных профиля */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function changePopupEditProfileData() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
}

  /* Установить данные профиля после их получения с сервера */

function setProfileData(newName) {
  profileName.textContent = newName.name;
  profileDescription.textContent = newName.about;
}

  /* Сохранить данные редактирования профиля */

function submitFormEditProfile(evt) {
  evt.preventDefault();

  changeSubmitText(true, popupEditProfile);

  changeNameOnServer(popupEditProfileName, popupEditProfileDescription)
  .then((newName) => {
    setProfileData(newName);
    closePopup(popupEditProfile);
    changeSubmitText(false, popupEditProfile);
  })
  .catch(error => console.log(`Ошибка ${error}`))
}

  /* Сохранить данные создания нового места */

function submitCreateNewPlace(evt) {
  evt.preventDefault();

  changeSubmitText(true, popupNewPlace);

  postNewPlaceOnServer(popupNewPlaceImage, popupNewPlaceTitle)
  .then(card => {
    renderCard(card);
    closePopup(popupNewPlace);
    popupNewPlaceForm.reset();
    changeSubmitText(false, popupNewPlace);
    toggleButtonState(validationConfig, popupNewPlaceForm, popupNewPlaceInputs);
  })
  .catch(error => console.log(`Ошибка:${error.status} ${error.statusText}`))
}

  /* Сохранить новое фото профиля */

function submitEditProfilePhoto(evt) {
  evt.preventDefault();

  changeSubmitText(true, popupEditProfilePhoto);

  const popupEditProfilePhotoLink = popupEditProfilePhotoInput.value;

  changeAvatarOnServer(popupEditProfilePhotoLink)
  .then(profileData => {
    setAvatar(profileAvatar, profileData.avatar);
    closePopup(popupEditProfilePhoto);
    popupEditProfilePhotoForm.reset();
    changeSubmitText(false, popupEditProfilePhoto);
    toggleButtonState(validationConfig, popupEditProfilePhotoForm, [popupEditProfilePhotoInput]);
  })
  .catch(err => {console.log(err)})
}

  /* Установить новый аватар после получения с сервера */

function setAvatar(profileAvatar, avatar) {
  profileAvatar.src = avatar;
}

export {fillPopupPhoto, popupEditProfile, popupEditProfileForm, popupEditProfileInputs,
  popupNewPlace, popupNewPlaceForm, changePopupEditProfileData, setProfileData, submitFormEditProfile,
  submitCreateNewPlace, profileName, profileDescription, popupDeleteCard, popupDeleteCardForm,
  popupEditProfilePhoto, popupEditProfilePhotoForm, submitEditProfilePhoto, setAvatar, profileAvatar};

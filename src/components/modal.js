import {openPopup} from './utils.js';

// import {validationConfig} from './validate.js';
// import {formValidator} from '../components/index.js';
// console.log(formValidator.inputSelector);
const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoTitle = popupPhoto.querySelector('.popup__title');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.form');
const popupEditProfileName = popupEditProfile.querySelector('.form__item_type_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.form__item_type_work');
const popupEditProfileInputs = Array.from(popupEditProfile.querySelectorAll('.form__item'));

const popupNewPlace = document.querySelector('.popup_new-place');
const popupNewPlaceForm = popupNewPlace.querySelector('.form');
const popupNewPlaceImage = popupNewPlace.querySelector('.form__item_type_image');
const popupNewPlaceTitle = popupNewPlace.querySelector('.form__item_type_title');
const popupNewPlaceInputs = Array.from(popupNewPlaceForm.querySelectorAll('.form__item'));

const popupDeleteCard = document.querySelector('.popup_delete-card');
const popupDeleteCardForm = popupDeleteCard.querySelector('.form');

const popupEditProfilePhoto = document.querySelector('.popup_edit-profile-photo');
const popupEditProfilePhotoForm = popupEditProfilePhoto.querySelector('.form');
const popupEditProfilePhotoInput = popupEditProfilePhotoForm.querySelector('.form__item_type_user-photo');
const profileAvatar = document.querySelector('.profile__avatar');


  /* Наполнить поп-ап с фото */

function fillPopupPhoto(image, title) {
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
  // popupPhotoTitle.insertAdjacentText('afterbegin',  title);
  popupPhotoTitle.textContent = title;
}

  /* Подтянуть данные профиля в поп-ап с редактированием данных профиля */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function changePopupEditProfileData() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
}


export {fillPopupPhoto, popupEditProfile, popupEditProfileForm, popupEditProfileInputs, popupEditProfileName,
  popupEditProfileDescription, popupNewPlace, popupNewPlaceForm, popupNewPlaceInputs, popupNewPlaceImage,
  popupNewPlaceTitle, changePopupEditProfileData, profileName, profileDescription, popupDeleteCard,
  popupDeleteCardForm, popupEditProfilePhoto, popupEditProfilePhotoForm, popupEditProfilePhotoInput, profileAvatar};

import {openPopup, closePopup, cleanTitle} from './utils.js';
import {validationConfig, toggleButtonState} from './validate.js'
import {renderCard} from './card.js';

  /* Наполнить поп-ап с фото */

function fillPopupPhoto(evt, image, title) {
  const popupPhoto = document.querySelector('.popup_photo');
  const popupPhotoImage = popupPhoto.querySelector('.popup__image');
  const popupPhotoTitle = popupPhoto.querySelector('.popup__title');
  if (evt.target.classList.contains('element__image')) {
    cleanTitle(popupPhotoTitle);
    changeImagePopupPhoto(image, title, popupPhotoImage);
    changeTitlePopupPhoto(title, popupPhotoTitle);
    openPopup(popupPhoto);
  }
}

  /* Сменить изображение в поп-апе с фото */

function changeImagePopupPhoto(image, title, popupPhotoImage) {
  popupPhotoImage.setAttribute('src', image);
  popupPhotoImage.setAttribute('alt',  title);
}

  /* Сменить подпись в поп-апе с фото */

function changeTitlePopupPhoto(title, popupPhotoTitle) {
  popupPhotoTitle.insertAdjacentText('afterbegin',  title);
}

  /* Подтянуть данные профиля в поп-ап с редактированием данных профиля */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function changeProfileData(popup) {
  const name = popup.querySelector('.form__item_type_name');
  const description = popup.querySelector('.form__item_type_work');
  name.value = profileName.textContent;
  description.value = profileDescription.textContent;
}

  /* Сохранить данные редактирования профиля */

  const popupEditProfile = document.querySelector('.popup_edit-profile');
  const popupEditProfileName = popupEditProfile.querySelector('.form__item_type_name');
  const popupEditProfileDescription = popupEditProfile.querySelector('.form__item_type_work');

  function submitFormEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileDescription.textContent = popupEditProfileDescription.value;

    closePopup(popupEditProfile);
  }

  /* Сохранить данные создания нового места */

  const popupNewPlace = document.querySelector('.popup_new-place');
  const popupNewPlaceForm = popupNewPlace.querySelector('.form');
  const newImage = popupNewPlace.querySelector('.form__item_type_image');
  const newTitle = popupNewPlace.querySelector('.form__item_type_title');

  function submitCreateNewPlace(evt) {
    evt.preventDefault();
    renderCard(newImage.value, newTitle.value);
    closePopup(popupNewPlace);
    popupNewPlaceForm.reset();
    const inputs = Array.from(popupNewPlaceForm.querySelectorAll(validationConfig.inputSelector));
    toggleButtonState(validationConfig, popupNewPlaceForm, inputs);
  }

export {fillPopupPhoto, popupEditProfile, popupNewPlace, popupNewPlaceForm, changeProfileData, submitFormEditProfile, submitCreateNewPlace};

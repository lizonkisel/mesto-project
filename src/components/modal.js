import {openPopup, closePopup, cleanTitle} from './utils.js';
import {validationConfig, toggleButtonState} from './validate.js'
import {renderCard} from './card.js';
import {changeNameOnServer, getProfileDatafromServer, postNewPlaceOnServer, deleteCardFromServer} from './api.js';

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoTitle = popupPhoto.querySelector('.popup__title');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileName = popupEditProfile.querySelector('.form__item_type_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.form__item_type_work');

const popupNewPlace = document.querySelector('.popup_new-place');
const popupNewPlaceForm = popupNewPlace.querySelector('.form');
const popupNewPlaceImage = popupNewPlace.querySelector('.form__item_type_image');
const popupNewPlaceTitle = popupNewPlace.querySelector('.form__item_type_title');
const popupNewPlaceInputs = Array.from(popupNewPlaceForm.querySelectorAll(validationConfig.inputSelector));

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

function setProfileData(res) {
  profileName.textContent = res.name;
  profileDescription.textContent = res.about;
}

  /* Сохранить данные редактирования профиля */

function submitFormEditProfile(evt) {
  evt.preventDefault();

  changeNameOnServer(popupEditProfileName, popupEditProfileDescription)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then((res) => setProfileData(res))
  .catch(error => console.log(`Ошибка ${error}`));

  closePopup(popupEditProfile);
}

  /* Сохранить данные создания нового места */

function submitCreateNewPlace(evt) {
  evt.preventDefault();
  postNewPlaceOnServer(popupNewPlaceImage, popupNewPlaceTitle);
  // renderCard(popupNewPlaceImage.value, popupNewPlaceTitle.value);
  // postNewPlaceOnServer(popupNewPlaceImage, popupNewPlaceTitle);
  closePopup(popupNewPlace);
  popupNewPlaceForm.reset();
  toggleButtonState(validationConfig, popupNewPlaceForm, popupNewPlaceInputs);
}

const popupDeleteCard = document.querySelector('.popup_delete-card');

popupDeleteCard.addEventListener('submit', deleteCardEveryWhere);

function deleteCardEveryWhere(evt) {
  evt.preventDefault();
  const id = popupDeleteCard.dataset.cardId;
  deleteCardFromServer(id);
  deletePlace(document.querySelector(`[data-card-id='${id}']`));
  closePopup(popupDeleteCard);
}


/* Удалить карточку */

function deletePlace(place) {
  place.remove();
}




export {fillPopupPhoto, popupEditProfile, popupNewPlace, popupNewPlaceForm, changePopupEditProfileData, setProfileData, submitFormEditProfile, submitCreateNewPlace, profileName, profileDescription, popupDeleteCard, deleteCardEveryWhere};

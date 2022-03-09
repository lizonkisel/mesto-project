import '../index.css';
import {renderCard, deleteCardEveryWhere} from './card.js';
import {openPopup, closePopup} from './utils.js';
import {validationConfig, enableValidation, toggleButtonState, checkValidation} from './validate.js';
import {popupEditProfile, popupEditProfileForm, popupEditProfileInputs, popupNewPlace, popupNewPlaceForm,
  changePopupEditProfileData, setProfileData, submitFormEditProfile, submitCreateNewPlace, popupDeleteCardForm,
  popupEditProfilePhoto, popupEditProfilePhotoForm, submitEditProfilePhoto, setAvatar, profileAvatar} from './modal.js';
import {getCardsFromServer, getProfileDataFromServer} from './api.js';


/* ПЕРЕМЕННЫЕ */

  /* Кнопки открытия поп-апов */

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

  /* Все поп-апы на странице*/

const popups = Array.from(document.querySelectorAll('.popup'));


/* ИСПОЛНЯЕМЫЙ КОД */

  /* Отрисовываем карточки */

getProfileDataFromServer()
.then(profileData => {
  setProfileData(profileData);
  setAvatar(profileAvatar, profileData.avatar);

  getCardsFromServer()
  .then(function(cards) {
    return cards.forEach(function(card) {
      renderCard(card, profileData);
    })
  })
  .catch(function(error) {
    console.log(`Ошибка ${error}`);
  })
})
.catch(error => {console.log(`Ошибка ${error}`)})

  /* Вешаем обработчик слушателя события для поп-апа "Редактировать профиль" */

profileEditButton.addEventListener('click', function() {
  changePopupEditProfileData();
  popupEditProfileInputs.forEach(function(input) {
    checkValidation(validationConfig, popupEditProfile, input);
  })
  toggleButtonState(validationConfig, popupEditProfile, popupEditProfileInputs);

  openPopup(popupEditProfile);
});

  /* Вешаем обработчик слушателя события для поп-апа "Создать новое место" */

profileAddButton.addEventListener('click', function() {
  openPopup(popupNewPlace);
});

/* Вешаем обработчик слушателя события для поп-апа "Редактировать фотографию профиля" */

buttonEditProfilePhoto.addEventListener('click', function () {
  openPopup(popupEditProfilePhoto);
})

  /* Отправляем формы */

popupEditProfileForm.addEventListener('submit', submitFormEditProfile);

popupNewPlaceForm.addEventListener('submit', submitCreateNewPlace);

popupEditProfilePhotoForm.addEventListener('submit', submitEditProfilePhoto);

popupDeleteCardForm.addEventListener('submit', deleteCardEveryWhere);

  /* Закрываем поп-апы по клику на оверлей и крестик */

popups.forEach(function(popup) {
  popup.addEventListener("mousedown", function(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})

  /* Запускаем валидацию полей */

enableValidation(validationConfig);

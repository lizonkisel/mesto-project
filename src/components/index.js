import '../index.css';
import {initialCards, renderCard} from './card.js';
import {openPopup, closePopup} from './utils.js';
import {validationConfig, enableValidation, toggleButtonState, checkValidation} from './validate.js';
import {popupEditProfile, popupNewPlace, popupNewPlaceForm, changeProfileData, submitFormEditProfile, submitCreateNewPlace} from './modal.js';

/* ПЕРЕМЕННЫЕ */

  /* Кнопки открытия поп-апов */

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

  /* Форма внутри поп-апа редактирования профиля */

const popupEditProfileForm = popupEditProfile.querySelector('.form');

  /* Все поп-апы на странице*/

const popups = Array.from(document.querySelectorAll('.popup'));

  /* Поп-ап редактировнаия фото профиля */

const popupEditProfilePhoto = document.querySelector('.popup_edit-profile-photo');

  /* Все поля поп-апа "Редактировать профиль" */

const editProfileInputs = Array.from(popupEditProfile.querySelectorAll(validationConfig.inputSelector));


/* ИСПОЛНЯЕМЫЙ КОД */

  /* Отрисовываем карточки */

initialCards.forEach(function(item) {
  renderCard(item.link, item.title);
})

  /* Вешаем обработчик слушателя события для поп-апа "Редактировать профиль" */

profileEditButton.addEventListener('click', function() {
  changeProfileData(popupEditProfile);
  editProfileInputs.forEach(function(input) {
    checkValidation(validationConfig, popupEditProfile, input);
  })
  toggleButtonState(validationConfig, popupEditProfile, editProfileInputs);

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

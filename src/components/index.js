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


/* ИСПОЛНЯЕМЫЙ КОД */

  /* Отрисовываем карточки */

initialCards.forEach(function(item) {
  renderCard(item.link, item.title);
})
  /* Вешаем обработчик слушателя события для поп-апа "Редактировать профиль" */

profileEditButton.addEventListener('click', function() {
  changeProfileData(popupEditProfile);
  const inputs = Array.from(popupEditProfile.querySelectorAll(validationConfig.inputSelector));
  inputs.forEach(function(input) {
    checkValidation(validationConfig, popupEditProfile, input);
  })
  toggleButtonState(validationConfig, popupEditProfile, inputs);

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


  /* Закрываем поп-апы по нажатию на "Escape" */

document.addEventListener("keydown", function(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
})

  /* Закрываем поп-апы по клику на оверлей */

popups.forEach(function(popup) {
  popup.addEventListener("click", function(evt) {
    if (popup.classList.contains('popup_opened') && (evt.target === evt.currentTarget)) {
      closePopup(popup);
    }
  })
})

  /* Закрываем поп-апы по клику на крестик */

document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__button-close')) {
    const parentPopup = evt.target.closest(".popup");
    closePopup(parentPopup);
  }
})

  /* Запускаем валидацию полей */
enableValidation(validationConfig);

import '../index.css';
import {createNewPlace, toggleLike, setLikesAmount, deletePlace} from './card.js';
import {openPopup, closePopup, changeSubmitText} from './utils.js';
import {validationConfig, enableValidation, toggleButtonState, checkValidation} from './validate.js';
import {popupEditProfile, popupEditProfileForm, popupEditProfileInputs, popupEditProfileName,
  popupEditProfileDescription, popupNewPlace, popupNewPlaceForm, popupNewPlaceInputs,
  popupNewPlaceImage, popupNewPlaceTitle, changePopupEditProfileData, popupDeleteCard, popupDeleteCardForm,
  profileName, profileDescription, popupEditProfilePhoto, popupEditProfilePhotoForm,
  popupEditProfilePhotoInput, profileAvatar} from './modal.js';
import {getCardsFromServer, getProfileDataFromServer, changeNameOnServer, postNewPlaceOnServer,
  changeAvatarOnServer, putLike, deleteLike, deleteCardFromServer} from './api.js';


/* ПЕРЕМЕННЫЕ */


  /* Кнопки открытия поп-апов */

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

  /* Все поп-апы на странице*/

const popups = Array.from(document.querySelectorAll('.popup'));


/* ФУНКЦИИ */


  /* Отрисовать карточку */

const elements = document.querySelector('.elements');

function renderCard(card, me, insertMethod) {
  const newCard = createNewPlace(card, me);

  const newPlaceLike = newCard.querySelector('.element__like');
  newPlaceLike.addEventListener('click', function() {
    return changeLikeState(card, newPlaceLike)
  })

  if (insertMethod === 'append') {
    elements.append(newCard);
  } else {
    elements.prepend(newCard);
  }
}

  /* Изменить состояние лайка */

function changeLikeState(card, likeElement) {
  if (likeElement.classList.contains('element__like_active')) {
    deleteLike(card)
    .then(likes => {
      toggleLike(likeElement);
      setLikesAmount(likes)
    })
    .catch(err => {console.log(err)})
  } else {
    putLike(card)
    .then(likes => {
      toggleLike(likeElement);
      setLikesAmount(likes)
    })
    .catch(err => {console.log(err)})
  }
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
  })
  .catch(error => console.log(`Ошибка ${error}`))
  .finally(() => {
    changeSubmitText(false, popupEditProfile);
  })
}

  /* Сохранить данные создания нового места */

function submitCreateNewPlace(evt) {
  evt.preventDefault();

  changeSubmitText(true, popupNewPlace);

  postNewPlaceOnServer(popupNewPlaceImage, popupNewPlaceTitle)
  .then(card => {
    renderCard(card, card.owner, 'prepend');
    closePopup(popupNewPlace);
    popupNewPlaceForm.reset();
    toggleButtonState(validationConfig, popupNewPlaceForm, popupNewPlaceInputs);
  })
  .catch(error => console.log(`Ошибка:${error.status} ${error.statusText}`))
  .finally(() => {
    changeSubmitText(false, popupNewPlace);
  })
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
    toggleButtonState(validationConfig, popupEditProfilePhotoForm, [popupEditProfilePhotoInput]);
  })
  .catch(err => {console.log(err)})
  .finally(() => {
    changeSubmitText(false, popupEditProfilePhoto);
  })
}

  /* Установить новый аватар после получения с сервера */

function setAvatar(profileAvatar, avatar) {
  profileAvatar.src = avatar;
}

  /* Удалить карточку с серевера и со страницы */

function deleteCardEveryWhere(evt) {
  evt.preventDefault();
  const id = popupDeleteCard.dataset.cardId;
  deleteCardFromServer(id)
  .then(() => {
    deletePlace(document.querySelector(`[data-card-id='${id}']`));
    closePopup(popupDeleteCard)
  })
  .catch((error) => {
    console.log(`Ошибка:${error.status} ${error.statusText}`)
  })
}


/* ИСПОЛНЯЕМЫЙ КОД */


  /* Отрисовываем карточки */

Promise.all([getProfileDataFromServer(), getCardsFromServer()])
.then(function([profileData, cards]) {
  setProfileData(profileData);
  setAvatar(profileAvatar, profileData.avatar);
  cards.forEach(function(card) {
    renderCard(card, profileData, 'append');
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

export {renderCard};

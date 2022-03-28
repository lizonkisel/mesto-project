import '../index.css';
import {createNewPlace, toggleLike, setLikesAmount, deletePlace} from './card.js';
import {openPopup, closePopup, changeSubmitText} from './utils.js';
import {validationConfig, enableValidation, toggleButtonState, checkValidation} from './validate.js';
import {popupEditProfile, popupEditProfileForm, popupEditProfileInputs, popupEditProfileName,
  popupEditProfileDescription, popupNewPlace, popupNewPlaceForm, popupNewPlaceInputs,
  popupNewPlaceImage, popupNewPlaceTitle, changePopupEditProfileData, popupDeleteCard, popupDeleteCardForm,
  profileName, profileDescription, popupEditProfilePhoto, popupEditProfilePhotoForm,
  popupEditProfilePhotoInput, profileAvatar} from './modal.js';
// import {getCardsFromServer, getProfileDataFromServer, changeNameOnServer, postNewPlaceOnServer,
//   changeAvatarOnServer, putLike, deleteLike, deleteCardFromServer} from './api.js';
import Api from './classes/Api.js';
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
  'Content-Type': 'application/json'

  // headers: {
  //   authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
  //   'Content-Type': 'application/json'
  // }
});
console.log(api);
/* ПЕРЕМЕННЫЕ */


  /* Кнопки открытия поп-апов */

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

  /* Все поп-апы на странице*/

const popups = Array.from(document.querySelectorAll('.popup'));

  /* Переменная, содержащая id пользователя*/

let userId;


/* ФУНКЦИИ */


  /* Отрисовать карточку */

const elements = document.querySelector('.elements');

function renderCard(card, userId, insertMethod) {
  const newCard = createNewPlace(card, userId);

  if (insertMethod === 'append') {
    elements.append(newCard);
  } else {
    elements.prepend(newCard);
  }
}

  /* Изменить состояние лайка */

function changeLikeState(card, likeElement) {
  if (likeElement.classList.contains('element__like_active')) {
    api.deleteLike(card)
    .then(likes => {
      toggleLike(likeElement);
      setLikesAmount(likes)
    })
    .catch(err => {console.log(err)})
  } else {
    api.putLike(card)
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

  api.changeNameOnServer(popupEditProfileName, popupEditProfileDescription)
  .then((newName) => {
    //setProfileData(newName);
    closePopup(popupEditProfile);
    console.log('Имя изменено');
  })
  .catch(error => console.log(`Ошибка смены имени пользователя ${error}`))
  .finally(() => {
    changeSubmitText(false, popupEditProfile);
  })
}

  /* Сохранить данные создания нового места */

function submitCreateNewPlace(evt) {
  evt.preventDefault();

  changeSubmitText(true, popupNewPlace);

  api.postNewPlaceOnServer(popupNewPlaceImage, popupNewPlaceTitle)
  .then(card => {
    renderCard(card, userId, 'prepend');
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

  api.changeAvatarOnServer(popupEditProfilePhotoLink)
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
  api.deleteCardFromServer(id)
  .then(() => {
    deletePlace(document.querySelector(`[data-card-id='${id}']`));
    closePopup(popupDeleteCard)
  })
  .catch((error) => {
    console.log(`Ошибка:${error.status} ${error.statusText}`)
  })
}
api.processResponse

/* ИСПОЛНЯЕМЫЙ КОД */

  /* Отрисовываем карточки */

Promise.all([api.getProfileDataFromServer(), api.getCardsFromServer()])
.then(function([profileData, cards]) {

  userId = profileData._id;

  setProfileData(profileData);
  setAvatar(profileAvatar, profileData.avatar);
  cards.forEach(function(card) {
    renderCard(card, userId, 'append');
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

export {changeLikeState};









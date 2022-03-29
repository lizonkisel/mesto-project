import '../index.css';
import {deletePlace} from './card.js';
import {openPopup, closePopup, changeSubmitText} from './utils.js';
import {validationConfig} from './validate.js';
import {popupEditProfile, popupEditProfileForm, popupEditProfileInputs, popupEditProfileName,
  popupEditProfileDescription, popupNewPlace, popupNewPlaceForm, popupNewPlaceInputs,
  popupNewPlaceImage, popupNewPlaceTitle, changePopupEditProfileData, popupDeleteCard, popupDeleteCardForm,
  profileName, profileDescription, popupEditProfilePhoto, popupEditProfilePhotoForm,
  popupEditProfilePhotoInput, profileAvatar} from './modal.js';
import Api from './classes/Api.js';
import FormValidator from './classes/FormValidator.js';
import {Card} from './classes/Card.js';
import {Section} from './classes/Section.js';


/* ПЕРЕМЕННЫЕ */


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
  contentType: 'application/json'
});

const formValidator = new FormValidator({config: validationConfig});

  /* Кнопки открытия поп-апов */

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

  /* Все поп-апы на странице*/

const popups = Array.from(document.querySelectorAll('.popup'));

  /* Переменная, содержащая id пользователя*/

let userId;

  /* Отрисовать карточку */

const elements = document.querySelector('.elements');

const cardList = new Section({
  renderer: (card, insertMethod) => {
    const newCardElement = new Card({
      card,
      handleLikeClick: (newCardElement) => {
        if (newCardElement.isLiked()) {
          api.deleteLike(newCardElement.getId())
          .then(card => {
            newCardElement.toggleLike();
            newCardElement.checkLikesAmount(card)
          })
          .catch(err => {console.log(err)})
        } else {
          api.putLike(newCardElement.getId())
          .then(card => {
            newCardElement.toggleLike();
            newCardElement.checkLikesAmount(card)
          })
          .catch(err => {console.log(err)})
        }
      }},
      userId,
      '#place-template'
    );
    const newCard = newCardElement.generate();
    cardList.addItem(newCard, insertMethod);
  }},
  '.elements'
)


/* ФУНКЦИИ */


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
    setProfileData(newName);
    closePopup(popupEditProfile);
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
    // renderCard(card, userId, 'prepend');
    // cardList.addItem(card, 'prepend');

    cardList.renderer(card, 'prepend');

    closePopup(popupNewPlace);
    popupNewPlaceForm.reset();
    formValidator.toggleButtonState(popupNewPlaceForm, popupNewPlaceInputs);
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
    formValidator.toggleButtonState(popupEditProfilePhotoForm, [popupEditProfilePhotoInput]);
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

  cardList.renderItems(cards);

})
.catch(error => {console.log(`Ошибка ${error}`)})

  /* Вешаем обработчик слушателя события для поп-апа "Редактировать профиль" */

profileEditButton.addEventListener('click', function() {
  changePopupEditProfileData();
  popupEditProfileInputs.forEach(function(input) {
    formValidator.checkValidation(popupEditProfile, input);
  })
  formValidator.toggleButtonState(popupEditProfile, popupEditProfileInputs);

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

  formValidator.enableValidation();


export {formValidator};










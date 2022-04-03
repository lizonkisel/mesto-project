import '../index.css';
import {Api} from './classes/Api.js';
import {FormValidator} from './classes/FormValidator.js';
import {Card} from './classes/Card.js';
import {Section} from './classes/Section.js';
import {PopupWithImage} from './classes/PopupWithImage.js';
import {PopupWithForm} from './classes/PopupWithForm.js';
import {UserInfo} from './classes/UserInfo.js';


/* ПЕРЕМЕННЫЕ */


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
  contentType: 'application/json'
});

const formValidator = new FormValidator({config: {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    errorClass: 'form__item_invalid'
  }
});

const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

  /* Кнопки открытия поп-апов */

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

  /* Переменная, содержащая id пользователя*/

let userId;
console.log(userId);

  /* Отрисовать карточку */

const cardList = new Section({
  renderer: (card, insertMethod) => {
    const newCardElement = new Card({
      card,
      handleCardClick: (newCardElement) => {
        const image = newCardElement.link;
        const title = newCardElement.name;
        popupWithImage.open(image, title);
      },

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
      },
      handleDeleteClick: (newCardElement) => {
        popupDeleteCard.open();
        popupDeleteCard.popup.setAttribute("data-card-id", newCardElement._id);
      }
    },
      userId,
      '#place-template'
    );
    const newCard = newCardElement.generate();
    cardList.addItem(newCard, insertMethod);
  }},
  '.elements'
)

const popupWithImage = new PopupWithImage('.popup_photo');

  /* Отправляем формы */

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleSubmit: (evt) => {
    evt.preventDefault();

    popupEditProfile.changeSubmitText(true);

    api.changeNameOnServer(popupEditProfile.name, popupEditProfile.description)
    .then((newName) => {
      console.log(newName);
      userInfo.setUserInfo(newName);
      popupEditProfile.close();

    })
    .catch(error => console.log(`Ошибка смены имени пользователя ${error}`))
    .finally(() => {
      popupEditProfile.changeSubmitText(false);
    })
  }
})

const popupNewPlace = new PopupWithForm({
  popupSelector:'.popup_new-place',
  handleSubmit: (evt) => {
    evt.preventDefault();

    popupNewPlace.changeSubmitText(true);

    api.postNewPlaceOnServer(popupNewPlace.image, popupNewPlace.title)
    .then(card => {
      cardList.renderer(card, 'prepend');

      popupNewPlace.close();
      formValidator.toggleButtonState(popupNewPlace.form, popupNewPlace.inputs);
    })
    .catch(error => console.log(`Ошибка:${error.status} ${error.statusText}`))
    .finally(() => {
      popupNewPlace.changeSubmitText(false);
    })
  }
})

const popupEditProfilePhoto = new PopupWithForm( {
  popupSelector: '.popup_edit-profile-photo',
  handleSubmit: (evt) => {
    evt.preventDefault();

    popupEditProfilePhoto.changeSubmitText(true);

    api.changeAvatarOnServer(popupEditProfilePhoto.profilePhoto.value)
    .then(profileData => {
      userInfo.setUserInfo(profileData);
      popupEditProfilePhoto.close();
      formValidator.toggleButtonState(popupEditProfilePhoto.form, [popupEditProfilePhoto.profilePhoto]);
    })
    .catch(err => {console.log(err)})
    .finally(() => {
      popupEditProfilePhoto.changeSubmitText(false);
    })
  }
});

const popupDeleteCard = new PopupWithForm({
  popupSelector: '.popup_delete-card',
  handleSubmit: (evt) => {
    evt.preventDefault();
    const id = popupDeleteCard.popup.dataset.cardId;
    api.deleteCardFromServer(id)
    .then(() => {
      const cardForDelete = document.querySelector(`[data-card-id='${id}']`);
      cardForDelete.remove();
      cardForDelete = null;
      // deletePlace();
      popupDeleteCard.close();
    })
    .catch((error) => {
      console.log(`Ошибка:${error.status} ${error.statusText}`)
    })
  }
})


/* ФУНКЦИИ */


  /* Подтянуть данные профиля в поп-ап с редактированием данных профиля */

function changePopupEditProfileData() {
  popupEditProfile.name.value = profileName.textContent;
  popupEditProfile.description.value = profileDescription.textContent;
}


/* ИСПОЛНЯЕМЫЙ КОД */


  /* Отрисовываем карточки */

Promise.all([api.getProfileDataFromServer(), api.getCardsFromServer()])
.then(function([profileData, cards]) {
  userInfo.getUserInfo(profileData);
  userId = profileData._id;
  cardList.renderItems(cards);
})
.catch(error => {console.log(`Ошибка ${error}`)})

  /* Вешаем обработчик слушателя события для поп-апа "Редактировать профиль" */

profileEditButton.addEventListener('click', function() {
  changePopupEditProfileData();
  popupEditProfile.inputs.forEach(function(input) {
    formValidator.checkValidation(popupEditProfile.form, input);
  })
  formValidator.toggleButtonState(popupEditProfile.form, popupEditProfile.inputs);

  popupEditProfile.open();
});

  /* Вешаем обработчик слушателя события для поп-апа "Создать новое место" */

profileAddButton.addEventListener('click', function() {
  popupNewPlace.open();
});

/* Вешаем обработчик слушателя события для поп-апа "Редактировать фотографию профиля" */

buttonEditProfilePhoto.addEventListener('click', function () {
  popupEditProfilePhoto.open();
})

  /* Запускаем валидацию полей */

formValidator.enableValidation();

// export {formValidator, api};

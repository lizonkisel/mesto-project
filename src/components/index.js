import '../index.css';
import {apiConfig, configForFormValidator} from './constants.js';
import {Api} from './Api.js';
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';


/* ПЕРЕМЕННЫЕ */


  /* Кнопки открытия поп-апов */

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

  /* Переменная, содержащая id пользователя*/

let userId;

  /* Экземпляр класса Api */

const api = new Api(apiConfig);

  /* Экземпляр класса UserInfo */

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

  /* Экземпляр класса Section - контейнер для экземпляров класса Card */

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
            newCardElement.setLikesAmount(card)
          })
          .catch(err => {console.log(err)})
        } else {
          api.putLike(newCardElement.getId())
          .then(card => {
            newCardElement.toggleLike();
            newCardElement.setLikesAmount(card)
          })
          .catch(err => {console.log(err)})
        }
      },
      handleDeleteClick: (newCardElement) => {
        popupDeleteCard.open();
        popupDeleteCard.popup.setAttribute("data-card-id", newCardElement.id);
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

  /* Поп-ап с картинкой */

const popupWithImage = new PopupWithImage('.popup_photo');
popupWithImage.setEventListeners();

  /* Поп-ап редактирования профиля */

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleSubmit: (inputs) => {
    popupEditProfile.changeSubmitText(true);

    api.changeNameOnServer(inputs.name, inputs.description)
    .then((name) => {
      userInfo.setUserInfo(name);
      // popupEditProfile.closeWithReset();
      popupEditProfile.close();
    })
    .catch(error => console.log(`Ошибка смены имени пользователя ${error}`))
    .finally(() => {
      popupEditProfile.changeSubmitText(false);
    })
  }
})
popupEditProfile.setEventListeners();

  /* Поп-ап создания новой карточки */

const popupNewPlace = new PopupWithForm({
  popupSelector:'.popup_new-place',
  handleSubmit: (inputs) => {
    popupNewPlace.changeSubmitText(true);

    api.postNewPlaceOnServer(inputs.image, inputs.title)
    .then((card) => {
      cardList.renderer(card, 'prepend');

      popupNewPlace.close();
      // popupNewPlace.closeWithReset();
    })
    .catch(error => console.log(`Ошибка:${error.status} ${error.statusText}`))
    .finally(() => {
      popupNewPlace.changeSubmitText(false);
    })
  }
})
popupNewPlace.setEventListeners();


  /* Поп-ап редактирования фото профиля */

const popupEditProfilePhoto = new PopupWithForm( {
  popupSelector: '.popup_edit-profile-photo',
  handleSubmit: (inputs) => {
    popupEditProfilePhoto.changeSubmitText(true);

    api.changeAvatarOnServer(inputs.avatar)
    .then(avatar => {
      userInfo.setUserInfo(avatar);
      popupEditProfilePhoto.close();
      // popupEditProfilePhoto.closeWithReset();
    })
    .catch(err => {console.log('Ошибка смены фото' + err)})
    .finally(() => {
      popupEditProfilePhoto.changeSubmitText(false);
    })
  }

});
popupEditProfilePhoto.setEventListeners();

  /* Поп-ап удаления карточки */

const popupDeleteCard = new PopupWithForm({
  popupSelector: '.popup_delete-card',
  handleSubmit: () => {
    const id = popupDeleteCard.popup.dataset.cardId;
    api.deleteCardFromServer(id)
    .then(() => {
      const cardForDelete = document.querySelector(`[data-card-id='${id}']`);
      cardForDelete.remove();
      popupDeleteCard.close();
    })
    .catch((error) => {
      console.log(`Ошибка:${error.status} ${error.statusText}`)
    })
  }
});
popupDeleteCard.setEventListeners();



/* ФУНКЦИИ */


  /* Подтянуть данные профиля в поп-ап с редактированием данных профиля */

// function changePopupEditProfileData() {
//   popupEditProfile.inputsValues.name = userInfo.getUserInfo('name');
//   popupEditProfile.description.value = userInfo.getUserInfo('description');
// }


/* ИСПОЛНЯЕМЫЙ КОД */


  /* Записываем и отображаем информация о пользователе, отрисовываем карточки */

Promise.all([api.getProfileDataFromServer(), api.getCardsFromServer()])
.then(function([profileData, cards]) {
  userInfo.setUserInfo(profileData);
  // userId = userInfo.getUserInfo('id');
  userId = userInfo.getUserInfo().id;
  cardList.renderItems(cards);
})
.catch(error => {console.log(`Ошибка ${error}`)})

  /* Вешаем обработчик слушателя события для поп-апа "Редактировать профиль" */

const validatorProfileEdit = new FormValidator(configForFormValidator, '.popup_edit-profile');
validatorProfileEdit.enableValidation();

profileEditButton.addEventListener('click', function() {
  // changePopupEditProfileData();
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
});

  /* Вешаем обработчик слушателя события для поп-апа "Создать новое место" */

const validatorNewPlace = new FormValidator(configForFormValidator, '.popup_new-place');
validatorNewPlace.enableValidation();

profileAddButton.addEventListener('click', function() {
  popupNewPlace.open();
});

/* Вешаем обработчик слушателя события для поп-апа "Редактировать фотографию профиля" */

const validatorEditProfilePhoto = new FormValidator(configForFormValidator, '.popup_edit-profile-photo');
validatorEditProfilePhoto.enableValidation();

buttonEditProfilePhoto.addEventListener('click', function () {
  popupEditProfilePhoto.open();
})

  /* Запускаем валидацию полей */

// formValidator.enableValidation();

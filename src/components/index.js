import '../index.css';
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

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
    'Content-Type': 'application/json'
  }
}

const api = new Api(apiConfig);

  /* Экземпляр класса UserInfo */

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

const configForFormValidator = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  errorClass: 'form__item_invalid'
}

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

  /* Поп-ап с картинкой */

const popupWithImage = new PopupWithImage('.popup_photo');


  /* Поп-ап редактирования профиля */

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleSubmit: (evt) => {
    evt.preventDefault();

    popupEditProfile.changeSubmitText(true);

    api.changeNameOnServer(popupEditProfile.name, popupEditProfile.description)
    .then((name) => {
      userInfo.setUserInfo(name);
      popupEditProfile.closeWithReset();

    })
    .catch(error => console.log(`Ошибка смены имени пользователя ${error}`))
    .finally(() => {
      popupEditProfile.changeSubmitText(false);
    })
  }
})



  /* Поп-ап создания новой карточки */

const popupNewPlace = new PopupWithForm({
  popupSelector:'.popup_new-place',
  handleSubmit: (evt) => {
    evt.preventDefault();

    popupNewPlace.changeSubmitText(true);

    api.postNewPlaceOnServer(popupNewPlace.image, popupNewPlace.title)
    .then(card => {
      cardList.renderer(card, 'prepend');

      popupNewPlace.closeWithReset();
      // formValidator.toggleButtonState(popupNewPlace.form, popupNewPlace.inputs);
    })
    .catch(error => console.log(`Ошибка:${error.status} ${error.statusText}`))
    .finally(() => {
      popupNewPlace.changeSubmitText(false);
    })
  }
})

  /* Поп-ап редактирования фото профиля */

const popupEditProfilePhoto = new PopupWithForm( {
  popupSelector: '.popup_edit-profile-photo',
  handleSubmit: (evt) => {
    evt.preventDefault();
    // popupEditProfilePhoto.submitHandler();
    popupEditProfilePhoto.changeSubmitText(true);
    // popupEditProfilePhoto.changeSubmitText(true);

    // console.log(popupEditProfilePhoto.profilePhoto)

    api.changeAvatarOnServer(popupEditProfilePhoto.profilePhoto.value)
    // api.changeAvatarOnServer(popupEditProfilePhoto.profilePhoto)
    .then(avatar => {
      userInfo.setUserInfo(avatar);

      // popupEditProfilePhoto.closeWithReset();
      popupEditProfilePhoto.closeWithReset();

      // formValidator.toggleButtonState(popupEditProfilePhoto.form, [popupEditProfilePhoto.profilePhoto]);
    })
    .catch(err => {console.log('Ошибка смены фото' + err)})
    .finally(() => {
      popupEditProfilePhoto.changeSubmitText(false);
      // popupEditProfilePhoto.changeSubmitText(false);
    })
  }

  // handleSubmit: (evt) => {
  //   evt.preventDefault();
  //   popupEditProfilePhoto.submitHandler();
  //   popupEditProfilePhoto.changeSubmitText(true);

  //   api.changeAvatarOnServer(popupEditProfilePhoto.profilePhoto)
  //   .then(avatar => {
  //     userInfo.setUserInfo(avatar);

  //     popupEditProfilePhoto.closeWithReset();

  //   })
  //   .catch(err => {console.log(err)})
  //   .finally(() => {
  //     this.changeSubmitText(false);
  //     popupEditProfilePhoto.changeSubmitText(false);
  //   })
  // }






});

  /* Поп-ап удаления карточки */

const popupDeleteCard = new PopupWithForm({
  popupSelector: '.popup_delete-card',
  handleSubmit: (evt) => {
    evt.preventDefault();
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
})



/* ФУНКЦИИ */


  /* Подтянуть данные профиля в поп-ап с редактированием данных профиля */

function changePopupEditProfileData() {
  popupEditProfile.name.value = userInfo.getUserInfo('name');
  popupEditProfile.description.value = userInfo.getUserInfo('description');
}


/* ИСПОЛНЯЕМЫЙ КОД */


  /* Записываем и отображаем информация о пользователе, отрисовываем карточки */

Promise.all([api.getProfileDataFromServer(), api.getCardsFromServer()])
.then(function([profileData, cards]) {
  userInfo.setUserInfo(profileData);
  userId = userInfo.getUserInfo('id');
  cardList.renderItems(cards);
})
.catch(error => {console.log(`Ошибка ${error}`)})

  /* Вешаем обработчик слушателя события для поп-апа "Редактировать профиль" */

profileEditButton.addEventListener('click', function() {
  changePopupEditProfileData();
  popupEditProfile.open();

  // const validatorEditProfile = new FormValidator(configForFormValidator);

  // popupEditProfile.inputs.forEach(function(input) {
  //   validatorEditProfile.checkValidation(popupEditProfile.form, input);
  // })

  // formValidator.toggleButtonState(popupEditProfile.form, popupEditProfile.inputs);

  new FormValidator(configForFormValidator).enableValidation();



  // validatorEditProfile.enableValidation();
});

  /* Вешаем обработчик слушателя события для поп-апа "Создать новое место" */

profileAddButton.addEventListener('click', function() {
  popupNewPlace.open();

  new FormValidator(configForFormValidator).enableValidation();
  // const validatorNewPlace = new FormValidator(configForFormValidator);
  // validatorNewPlace.enableValidation();


});

/* Вешаем обработчик слушателя события для поп-апа "Редактировать фотографию профиля" */



buttonEditProfilePhoto.addEventListener('click', function () {
  popupEditProfilePhoto.open();


  // validatorEditProfilePhoto.enableValidation();
  // const validatorEditProfilePhoto = new FormValidator( (configForFormValidator) => {
  //   validatorEditProfilePhoto.enableValidation();
  // });
  new FormValidator(configForFormValidator).enableValidation();

    // const validatorEditProfilePhoto = new FormValidator(configForFormValidator);
    // validatorEditProfilePhoto.enableValidation();

})

  /* Запускаем валидацию полей */

// formValidator.enableValidation();

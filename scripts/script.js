const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* ПЕРЕМЕННЫЕ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

const profileEdit = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__button-close');

  /* Заполнение полей формы */

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupEditProfileName = popupEditProfile.querySelector('.form__item_type_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.form__item_type_work');

  /* Изменение данных профиля */

const popupEditProfileForm = popupEditProfile.querySelector('.form');

  /* Создание нового места */

const popupNewPlace = document.querySelector('.popup_new-place');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewPlaceCloseButton = popupNewPlace.querySelector('.popup__button-close');

const popupNewPlaceForm = popupNewPlace.querySelector('.form');

const newImage = popupNewPlace.querySelector('.form__item_type_image');
const newTitle = popupNewPlace.querySelector('.form__item_type_title');

  /* Открытие/закрытие поп-апа с фото */

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoImage = popupPhoto.querySelector('.popup__image');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close');
const popupPhotoTitle = popupPhoto.querySelector('.popup__title');

  /* Закрыть поп-ап при нажатии на 'esc' или оверлей*/

const popups = document.querySelectorAll('.popup');

  /* Открыть/закрыть поп-ап "Редактировать фото профиля" */

const popupEditProfilePhoto = document.querySelector('.popup_edit-profile-photo');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');


/* ФУНКЦИИ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

  /* Заполнение полей формы */

function changeProfileData() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
}

  /* Изменение данных профиля */

function submitFormEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfileName.value;
  profileDescription.textContent = popupEditProfileDescription.value;

  closePopup(popupEditProfile);
}

  /* Создание нового места */

function createNewPlace(image, title) {
  const templateNewPlace = document.querySelector('#place-template').content;

  const newPlace = templateNewPlace.querySelector('.element').cloneNode(true);
  newPlace.querySelector('.element__image').src = image;
  newPlace.querySelector('.element__image').alt = title;
  newPlace.querySelector('.element__title').textContent = title;
  newPlace.querySelector('.element__like').addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    console.log(eventTarget);
    eventTarget.classList.toggle('element__like_active');
  })
  newPlace.querySelector('.element__delete').addEventListener('click', deletePlace);

  newPlace.querySelector('.element__image').addEventListener('click', function() {
    cleanPopupPhotoTitle();
    openPopup(popupPhoto);
    const photoLink = image;
    const photoTitle = title;
    changePopupPhoto(photoLink, photoTitle);
  })

  return newPlace;
}

function renderCard(image, title) {
  const elements = document.querySelector('.elements');
  const newCard = createNewPlace(image, title);
  elements.prepend(newCard);
  closePopup(popupNewPlace);
  cleanNewPlaceData();
}

function cleanNewPlaceData() {
  newImage.value = '';
  newTitle.value = '';
}

function submitCreateNewPlace(evt) {
  evt.preventDefault();
  renderCard(newImage.value, newTitle.value);
}

  /* Удаление карточки */

function deletePlace(evt) {
  const eventTarget = evt.target;
  const deletablePlace = eventTarget.closest('.element');
  deletablePlace.remove();
}

  /* Открытие/закрытие поп-апа с фото */

function changePopupPhoto(photoLink, photoTitle) {
  popupPhotoImage.setAttribute('src', photoLink);
  popupPhotoImage.setAttribute('alt', photoTitle);
  popupPhotoTitle.insertAdjacentText('afterbegin', photoTitle);
}

function cleanPopupPhotoTitle() {
  popupPhotoTitle.textContent = '';
}

  /* Закрыть поп-ап при нажатии на 'esc' */

function closeByEsc(evtKey, openedPopup) {
  if (evtKey === 'Escape') {
    closePopup(openedPopup);
  }
}


/* ИСПОЛНЯЕМЫЙ КОД */

initialCards.forEach(function(item) {
  renderCard(item.link, item.name);
})

profileEdit.addEventListener('click', function() {
  changeProfileData();
  openPopup(popupEditProfile);
});

popupEditProfileCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

popupEditProfileForm.addEventListener('submit', submitFormEditProfile);

profileAddButton.addEventListener('click', function() {
  openPopup(popupNewPlace);
});

popupNewPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace);
});

popupNewPlaceForm.addEventListener('submit', submitCreateNewPlace);

popupPhotoCloseButton.addEventListener('click', function() {
  closePopup(popupPhoto);
})


document.addEventListener("keydown", function(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup !== null) {
    evtKey = evt.key;
    closeByEsc(evtKey, openedPopup);
  }
})

popups.forEach(function(popup) {
  popup.addEventListener("click", function(evt) {
    evtKey = evt.key;
    if (popup.classList.contains('popup_opened') & (evt.target === evt.currentTarget)) {
      openedPopup = popup;
      closePopup(openedPopup);
    }
  })
})


buttonEditProfilePhoto.addEventListener('click', function () {
  openPopup( popupEditProfilePhoto);
})

/* Artefact */


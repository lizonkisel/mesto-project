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

/* ФУНКЦИИ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  if (popupName === popupEditProfile) {
    changeProfileData();
  } else if (popupName === popupNewPlace) {
    cleanNewPlaceData();
  } else if (popupName === popupPhoto) {
    cleanPopupPhotoTitle();
  }
}

  /* Заполнение полей формы */

function changeProfileData() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
}

  /* Изменение данных профиля */

function submitForm(form) {
  form.preventDefault();
  profileName.textContent = popupEditProfileName.value;
  profileDescription.textContent = popupEditProfileDescription.value;

  closePopup(popupEditProfile);
}

  /* Создание нового места */

function createNewPlace(image, title) {
  const templateNewPlace = document.querySelector('#place-template').content;
  const elements = document.querySelector('.elements');

  let newPlace = templateNewPlace.querySelector('.element').cloneNode(true);
  newPlace.querySelector('.element__image').src = image;
  newPlace.querySelector('.element__title').textContent = title;
  newPlace.querySelector('.element__like').addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    console.log(eventTarget);
    eventTarget.classList.toggle('element__like_active');
  })
  newPlace.querySelector('.element__delete').addEventListener('click', deletePlace);

  newPlace.querySelector('.element__image').addEventListener('click', function() {
    openPopup(popupPhoto);
    const photoLink = newPlace.querySelector('.element__image').getAttribute('src');
    const photoTitle = newPlace.querySelector('.element__title').textContent;
    changePopupPhoto(photoLink, photoTitle);
  })

  elements.prepend(newPlace);

  closePopup(popupNewPlace);
}

function cleanNewPlaceData() {
  newImage.value = '';
  newTitle.value = '';
}

function createNewPlaceWrapper(evt) {
  evt.preventDefault();
  createNewPlace(newImage.value, newTitle.value);
}

  /* Удаление карточки */

function deletePlace(evt) {
  const eventTarget = evt.target;
  let deletablePlace = eventTarget.closest('.element');
  deletablePlace.remove();
}

  /* Открытие/закрытие поп-апа с фото */

function changePopupPhoto(photoLink, photoTitle) {
  popupPhotoImage.setAttribute('src', photoLink);
  popupPhotoTitle.insertAdjacentText('afterbegin', photoTitle);
}

function cleanPopupPhotoTitle() {
  popupPhotoTitle.textContent = '';
}


/* ИСПОЛНЯЕМЫЙ КОД */

for (let i = 0; i < initialCards.length; i++) {
  createNewPlace(initialCards[i].link, initialCards[i].name);
}

profileEdit.addEventListener('click', function() {
  openPopup(popupEditProfile);
});

popupEditProfileCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

popupEditProfileForm.addEventListener('submit', submitForm);

profileAddButton.addEventListener('click', function() {
  openPopup(popupNewPlace);
});

popupNewPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace);
});

popupNewPlaceForm.addEventListener('submit', createNewPlaceWrapper);

popupPhotoCloseButton.addEventListener('click', function() {
  closePopup(popupPhoto);
})

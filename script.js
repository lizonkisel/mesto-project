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

let profileEdit = document.querySelector('.profile__edit');
let popupEditProfile = document.querySelector('.popup_editProfile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.form__button-close');

  /* Заполнение полей формы */

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupEditProfileName = popupEditProfile.querySelector('.form__item_type_name');
let popupEditProfileDescription = popupEditProfile.querySelector('.form__item_type_work');

  /* Изменение данных профиля */

let popupEditProfileForm = popupEditProfile.querySelector('.form');

  /* Создание нового места */

const popupNewPlace = document.querySelector('.popup_newPlace');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewPlaceCloseButton = popupNewPlace.querySelector('.form__button-close');

const popupNewPlaceForm = popupNewPlace.querySelector('.form');

const newImage = popupNewPlace.querySelector('.form__item_type_image');
const newTitle = popupNewPlace.querySelector('.form__item_type_title');


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
  }
}

  /* Заполнение полей формы */

    /* Эту функцию, по-хорошему, надо переименовать */
function changeProfileData() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
}

  /* Изменение данных профиля */

function formSubmit(form) {
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

  elements.prepend(newPlace);

  closePopup(popupNewPlace);
}

function cleanNewPlaceData() {
  newImage.value = '';
  newTitle.value = '';
}

function wrapperCreateNewPlace(evt) {
  evt.preventDefault();
  createNewPlace(newImage.value, newTitle.value);
}

  /* Удаление карточки */

function deletePlace(evt) {
  const eventTarget = evt.target;
  let deletablePlace = eventTarget.closest('.element');
  deletablePlace.remove();
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
popupEditProfileForm.addEventListener('submit', formSubmit);

profileAddButton.addEventListener('click', function() {
  openPopup(popupNewPlace);
});
popupNewPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace);
});

popupNewPlaceForm.addEventListener('submit', wrapperCreateNewPlace);

console.log(document.documentElement.clientWidth);
console.log(document.body.clientWidth);
console.log(document.documentElement.scrollWidth);
console.log(window.innerWidth);
console.log(window.outerWidth)



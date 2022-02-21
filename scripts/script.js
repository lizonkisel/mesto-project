const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* ПЕРЕМЕННЫЕ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

const profileEdit = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');

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

const popupNewPlaceForm = popupNewPlace.querySelector('.form');

const newImage = popupNewPlace.querySelector('.form__item_type_image');
const newTitle = popupNewPlace.querySelector('.form__item_type_title');

  /* Закрыть поп-ап при нажатии на 'esc' или оверлей*/

const popups = Array.from(document.querySelectorAll('.popup'));

  /* Открыть/закрыть поп-ап "Редактировать фото профиля" */

const popupEditProfilePhoto = document.querySelector('.popup_edit-profile-photo');
const buttonEditProfilePhoto = document.querySelector('.profile__avatar-mask');

/* Валидация поп-апов */

  /* Запускаем процесс выбора форм и добавления слушателей полям  */

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  errorClass: 'form__item_invalid'
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  console.log(forms);
  forms.forEach(function(form) {
    console.log(form);
    setInputListeners(config, form);
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
  })
}

function setInputListeners(config, form) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  console.log(inputs);
  toggleButtonState(config, form, inputs);
  inputs.forEach(function(input) {
    input.addEventListener('input', function(evt) {
      checkValidation(config, form, input);
      toggleButtonState(config, form, inputs);
    })
  })
}

function toggleButtonState(config, form, inputs) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (hasInvalidInput(inputs)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(function(input) {
    return !input.validity.valid;
  })
}

function checkValidation(config, form, input) {
  const inputError = form.querySelector(`.${input.name}-error`);
  const inputErrorText = input.validationMessage;
  if(!input.validity.valid) {
    input.classList.add(config.errorClass);
    inputError.textContent = inputErrorText;

  } else {
    input.classList.remove(config.errorClass);
    inputError.textContent = '';
  }
}

/* Рефакторинг (конец) */


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
  newPlace.addEventListener('click', function(evt) {
    deletePlace(evt, newPlace);
    toggleLike(evt);
    fillPopupPhoto(evt, image, title);
  });

  return newPlace;
}

  /* Удаление карточки */

function deletePlace(evt, newPlace) {
  if (evt.target.classList.contains('element__delete')) {
    newPlace.remove();
  }
}

  /* Переключение лайка */

function toggleLike(evt) {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
}

  /* Напонить поп-ап с фото */

function fillPopupPhoto(evt, image, title) {
  const popupPhoto = document.querySelector('.popup_photo');
  const popupPhotoImage = popupPhoto.querySelector('.popup__image');
  const popupPhotoTitle = popupPhoto.querySelector('.popup__title');
  if (evt.target.classList.contains('element__image')) {
    cleanTitle(popupPhotoTitle);
    changeImagePopupPhoto(image, title, popupPhotoImage);
    changeTitlePopupPhoto(title, popupPhotoTitle);
    openPopup(popupPhoto);
  }
}

  /* Очистить название */

function cleanTitle(title) {
  title.textContent = '';
}

  /* Сменить изображение в поп-апе с фото */

function changeImagePopupPhoto(image, title, popupPhotoImage) {
  popupPhotoImage.setAttribute('src', image);
  popupPhotoImage.setAttribute('alt',  title);
}

  /* Сменить подпись в поп-апе с фото */

function changeTitlePopupPhoto(title, popupPhotoTitle) {
  popupPhotoTitle.insertAdjacentText('afterbegin',  title);
}

function renderCard(image, title) {
  const elements = document.querySelector('.elements');
  const newCard = createNewPlace(image, title);
  elements.prepend(newCard);
}

function submitCreateNewPlace(evt) {
  evt.preventDefault();
  renderCard(newImage.value, newTitle.value);
  closePopup(popupNewPlace);
  popupNewPlaceForm.reset();
  // toggleButtonState(popupNewPlaceForm, inputs)
}


/* ИСПОЛНЯЕМЫЙ КОД */

  /* Отрисовываем карточки */

initialCards.forEach(function(item) {
  renderCard(item.link, item.title);
})
  /* Открываем поп-апы */

profileEdit.addEventListener('click', function() {
  changeProfileData();
  openPopup(popupEditProfile);
});

profileAddButton.addEventListener('click', function() {
  openPopup(popupNewPlace);
});

buttonEditProfilePhoto.addEventListener('click', function () {
  openPopup(popupEditProfilePhoto);
})

  /* Отправляем формы */

popupEditProfileForm.addEventListener('submit', submitFormEditProfile);

popupNewPlaceForm.addEventListener('submit', submitCreateNewPlace);


  /* Закрываем поп-апы */

document.addEventListener("keydown", function(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
})

popups.forEach(function(popup) {
  popup.addEventListener("click", function(evt) {
    if (popup.classList.contains('popup_opened') && (evt.target === evt.currentTarget)) {
      closePopup(popup);
    }
  })
})

document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__button-close')) {
    const parentPopup = evt.target.closest(".popup");
    closePopup(parentPopup);
  }
})

enableValidation(validationConfig);

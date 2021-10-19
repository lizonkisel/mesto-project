/* ПЕРЕМЕННЫЕ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

let profileEdit = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_editProfile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.form__button-close');

  /* Заполнение полей формы */

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupEditProfileName = popupEditProfile.querySelector('.form__item_type_name');
let popupEditProfileDescription = popupEditProfile.querySelector('.form__item_type_work');

  /* Изменение данных профиля */

let popupEditProfileForm = popupEditProfile.querySelector('.popup__form');

  /* Добавление нового места */

const popupNewPlace = document.querySelector('.popup_newPlace');
const popupNewPlaceCloseButton = popupNewPlace.querySelector('.form__button-close');

popupNewPlaceCloseButton.addEventListener('click', openPopup());



/* ФУНКЦИИ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

function openPopup() {
  popupEditProfile.classList.add('popup_opened');
  changeProfileData();
}

/* function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  changeProfileData();
} */

function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
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

  closePopup();
}


/* ИСПОЛНЯЕМЫЙ КОД */

profileEdit.addEventListener('click', openPopup);
popupEditProfileCloseButton.addEventListener('click', closePopup);
popupEditProfileForm.addEventListener('submit', formSubmit);



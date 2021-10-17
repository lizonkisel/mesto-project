/* ПЕРЕМЕННЫЕ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

let profileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.form__button-close');

  /* Заполнение полей формы */

let profileInformation = document.querySelector('.profile__profile-info');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupName = document.querySelector('.form__item_type_name');
let popupDescription = document.querySelector('.form__item_type_work');

  /* Изменение данных профиля */

let popupForm = document.querySelector('.popup__form');


/* ФУНКЦИИ */

  /* Открыть/закрыть поп-ап "Редактировать профиль" */

function openPopup() {
  popup.classList.add('popup_opened');
  changeProfileData();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

  /* Заполнение полей формы */

    /* Эту функцию, по-хорошему, надо переименовать */
function changeProfileData() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

  /* Изменение данных профиля */

function formSubmit(form) {
  form.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopup();
}


/* ИСПОЛНЯЕМЫЙ КОД */

profileEdit.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmit);

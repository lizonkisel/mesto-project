import {fillPopupPhoto} from './modal.js'

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

  /* Отрисовать карточку */

function renderCard(image, title) {
  const elements = document.querySelector('.elements');
  const newCard = createNewPlace(image, title);
  elements.prepend(newCard);
}

  /* Создать карточку нового места */

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

  /* Удалить карточку */

function deletePlace(evt, newPlace) {
  if (evt.target.classList.contains('element__delete')) {
    newPlace.remove();
  }
}

  /* Переключить лайк */

function toggleLike(evt) {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
}

export {initialCards, renderCard};

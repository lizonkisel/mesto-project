import {fillPopupPhoto, profileName, popupDeleteCard, deleteCardEveryWhere} from './modal.js';
import {getCardsFromServer, deleteCardFromServer} from './api.js';
import { openPopup } from './utils.js';

/* const initialCards = [
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
]; */

const elements = document.querySelector('.elements');

  /* Отрисовать карточку */


function renderCard(card) {
  const newCard = createNewPlace(card);
  elements.prepend(newCard);
}

  /* Создать карточку нового места */

function createNewPlace(card) {

  const templateNewPlace = document.querySelector('#place-template').content;
  const newPlace = templateNewPlace.querySelector('.element').cloneNode(true);
  newPlace.querySelector('.element__title').textContent = card.name;

  newPlace.setAttribute("data-card-id", card._id);


  const newPlaceImage = newPlace.querySelector('.element__image');
  newPlaceImage.src = card.link;
  newPlaceImage.alt = card.name;
  newPlaceImage.addEventListener('click', function(evt) {
    fillPopupPhoto(card.link, card.name);
  });

  const newPlaceLike = newPlace.querySelector('.element__like');
  newPlaceLike.addEventListener('click', function() {
    toggleLike(newPlaceLike);
  });

  const newPlaceLikeAmount = newPlace.querySelector('.element__like-amount');
  newPlaceLikeAmount.textContent = card.likes.length || 0;


  const newPlaceDelete = newPlace.querySelector('.element__delete');
  if (card.owner.name === profileName.textContent) {
    newPlaceDelete.addEventListener('click', function() {
      openPopup(popupDeleteCard);
      popupDeleteCard.setAttribute("data-card-id", card._id);
    })
  } else {
    newPlaceDelete.remove();
  }

  return newPlace;
}

  /* Переключить лайк */

function toggleLike(like) {
  like.classList.toggle('element__like_active');
}

function getAmountOfLikes(likes) {
  getCardsFromServer()
  .then(res => {
    return res.forEach(function(card) {

    })
  })
}

export {renderCard};

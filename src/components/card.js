import {fillPopupPhoto, profileName, popupDeleteCard, deleteCardEveryWhere} from './modal.js';
import {getCardsFromServer, getProfileDatafromServer, deleteCardFromServer, putLike, deleteLike} from './api.js';
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


function renderCard(card, me = '') {
  const newCard = createNewPlace(card, me);
  elements.prepend(newCard);
}

  /* Создать карточку нового места */

function createNewPlace(card, me) {

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

  const newPlaceLikeAmount = newPlace.querySelector('.element__like-amount');
  newPlaceLikeAmount.textContent = card.likes.length || 0;

  const newPlaceLike = newPlace.querySelector('.element__like');
  newPlaceLike.addEventListener('click', function() {
    toggleLike(newPlaceLike, card);
  });
  checkLikes(card, me, newPlaceLike);

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

function toggleLike(like, card) {
  like.classList.toggle('element__like_active');
  if (like.classList.contains('element__like_active')) {
    putLike(card);
  } else {
    deleteLike(card);
  }
}

function checkLikes(card, me, newPlaceLike) {
  me = me._id;
  card.likes.some(function(likeAuthor) {
    if (likeAuthor._id === me) {
      newPlaceLike.classList.add('element__like_active');
    }
  })
}

export {renderCard};

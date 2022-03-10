import {fillPopupPhoto, profileName, popupDeleteCard} from './modal.js';
import {deleteCardFromServer, putLike, deleteLike} from './api.js';
import {openPopup, closePopup} from './utils.js';

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
  newPlaceLikeAmount.textContent = card.likes.length;

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
    putLike(card)
    .then(likes => {
      setLikesAmount(likes)
    })
    .catch(err => {console.log(err)})
  } else {
    deleteLike(card)
    .then(likes => {
      setLikesAmount(likes)
    })
    .catch(err => {console.log(err)})
  }
}

  /* Установить на странице количество лайков карточки */

function setLikesAmount(card) {
  const place = document.querySelector(`.element[data-card-id='${card._id}']`);
  place.querySelector('.element__like-amount').textContent = card.likes.length;
}

  /* Проверить, лайкнута ли эта карточка юзером до этого (в прошлое посещение сайта) */

function checkLikes(card, me, newPlaceLike) {
  me = me._id;
  card.likes.some(function(likeAuthor) {
    if (likeAuthor._id === me) {
      newPlaceLike.classList.add('element__like_active');
    }
  })
}

  /* Удалить карточку с серевера и со страницы */

function deleteCardEveryWhere(evt) {
  evt.preventDefault();
  const id = popupDeleteCard.dataset.cardId;
  deleteCardFromServer(id)
  .catch((error) => {
    console.log(`Ошибка:${error.status} ${error.statusText}`)
  })
  deletePlace(document.querySelector(`[data-card-id='${id}']`));
  closePopup(popupDeleteCard);
}

    /* Удалить карточку со страницы */

function deletePlace(place) {
  place.remove();
}


export {renderCard, deleteCardEveryWhere};

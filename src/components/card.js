import {fillPopupPhoto} from './modal.js';
import {getCardsFromServer} from './api.js';

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


function renderCard(image, title, likes) {
  const newCard = createNewPlace(image, title, likes);
  elements.prepend(newCard);
}

  /* Создать карточку нового места */

function createNewPlace(image, title, likes) {
  const templateNewPlace = document.querySelector('#place-template').content;
  const newPlace = templateNewPlace.querySelector('.element').cloneNode(true);
  newPlace.querySelector('.element__title').textContent = title;

  const newPlaceImage = newPlace.querySelector('.element__image');
  newPlaceImage.src = image;
  newPlaceImage.alt = title;
  newPlaceImage.addEventListener('click', function(evt) {
    fillPopupPhoto(image, title);
  });

  const newPlaceLike = newPlace.querySelector('.element__like');
  newPlaceLike.addEventListener('click', function() {
    toggleLike(newPlaceLike);
  });

  const newPlaceLikeAmount = newPlace.querySelector('.element__like-amount');
  newPlaceLikeAmount.textContent = likes.length;


  const newPlaceDelete = newPlace.querySelector('.element__delete');
  newPlaceDelete.addEventListener('click', function() {
    deletePlace(newPlace);
  })

  return newPlace;
}

  /* Удалить карточку */

function deletePlace(place) {
  place.remove();
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

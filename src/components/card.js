import {changeLikeState} from './index.js';
import {fillPopupPhoto, profileName, popupDeleteCard} from './modal.js';
import {openPopup} from './utils.js';

//   /* Создать карточку нового места */

// function createNewPlace(card, userId) {

//   const templateNewPlace = document.querySelector('#place-template').content;
//   const newPlace = templateNewPlace.querySelector('.element').cloneNode(true);
//   newPlace.querySelector('.element__title').textContent = card.name;

//   newPlace.setAttribute("data-card-id", card._id);


//   const newPlaceImage = newPlace.querySelector('.element__image');
//   newPlaceImage.src = card.link;
//   newPlaceImage.alt = card.name;
//   newPlaceImage.addEventListener('click', function(evt) {
//     fillPopupPhoto(card.link, card.name);
//   });

//   const newPlaceLikeAmount = newPlace.querySelector('.element__like-amount');
//   newPlaceLikeAmount.textContent = card.likes.length;

//   const newPlaceLike = newPlace.querySelector('.element__like');
//   newPlaceLike.addEventListener('click', function() {
//     return changeLikeState(card._id, newPlaceLike)
//   })
//   checkLikes(card, userId, newPlaceLike);

//   const newPlaceDelete = newPlace.querySelector('.element__delete');
//   if (card.owner._id === userId) {
//     newPlaceDelete.addEventListener('click', function() {
//       openPopup(popupDeleteCard);
//       popupDeleteCard.setAttribute("data-card-id", card._id);
//     })
//   } else {
//     newPlaceDelete.remove();
//   }

//   return newPlace;
// }

//   /* Переключить лайк */

// function toggleLike(like) {
//   like.classList.toggle('element__like_active');
// }

//   /* Установить на странице количество лайков карточки */

// function setLikesAmount(card) {
//   const place = document.querySelector(`.element[data-card-id='${card._id}']`);
//   place.querySelector('.element__like-amount').textContent = card.likes.length;
// }

//   /* Проверить, лайкнута ли эта карточка юзером до этого (в прошлое посещение сайта) */

// function checkLikes(card, userId, newPlaceLike) {
//   card.likes.some(function(likeAuthor) {
//     if (likeAuthor._id === userId) {
//       newPlaceLike.classList.add('element__like_active');
//     }
//   })
// }

  /* Удалить карточку со страницы */

function deletePlace(place) {
  place.remove();
  place = null;
} // Это пока не вставили


// export {createNewPlace, toggleLike, setLikesAmount, deletePlace};
export {deletePlace};

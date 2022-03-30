import {fillPopupPhoto, popupDeleteCard} from '../modal.js';
import {openPopup} from '../utils.js';

class Card {

  constructor({card, handleCardClick, handleLikeClick}, userId, templateSelector) {
    this.card = card;
    this.name = card.name;
    this._id = card._id;
    this.link = card.link;
    this.likes = card.likes;
    this.owner = card.owner;
    this.handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this.userId = userId;
    this.templateSelector = templateSelector;
  }

  _getElement() {
    const newCardElement = document.querySelector(this.templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return newCardElement;
  }

  getId() {
    return this._id;
  }

  _setTitle() {
    this.element.querySelector('.element__title').textContent = this.name;
    return this.element;
  }

  _setAttribute() {
    this.element.setAttribute("data-card-id", this._id);
  }

  _setImage() {
   this._newCardImage = this.element.querySelector('.element__image');
   this._newCardImage.src = this.link;
   this._newCardImage.alt = this.name;
  }

  _setLike() {
    this._newCardLike = this.element.querySelector('.element__like');
  }

  _setLikesAmount() {
    this._newCardLikeAmount = this.element.querySelector('.element__like-amount');
  }

  _checkLikes() {
    this.likes.some(function(likeAuthor) {
      if (likeAuthor._id === this.userId) {
        this._newCardLike.classList.add('element__like_active');
      }
    }.bind(this));
  }

  checkLikesAmount(card) {
    this._newCardLikeAmount.textContent = card.likes.length;
  }

  isLiked() {
    return this._newCardLike.classList.contains('element__like_active');
  }

  _setDelete() {
    this._newCardDelete = this.element.querySelector('.element__delete');
  }

  _checkDelete() {
    if (this.owner._id != this.userId) {
      this._newCardDelete.remove();
    }
  }

  toggleLike() {
    this._newCardLike.classList.toggle('element__like_active');
  }

  _setEventListeners() {

    // Здесь пишем стрелочные функции, чтобы контекст this был привязан к классу (к функции-конструктору)

    this._newCardImage.addEventListener('click', () => {
      // fillPopupPhoto(this.link, this.name);
      this.handleCardClick(this);
    });

    this._newCardLike.addEventListener('click', () => {
      this._handleLikeClick(this);
    })

    this._newCardDelete.addEventListener('click', () => {
      openPopup(popupDeleteCard);
      popupDeleteCard.setAttribute("data-card-id", this._id);
    })

  }

  generate() {
    this.element = this._getElement();
    this._setTitle();
    this._setAttribute();
    this._setImage();
    this._setLike();
    this._setLikesAmount();
    this._checkLikes();
    this.checkLikesAmount(this);
    this._setDelete();
    this._checkDelete();

    this._setEventListeners();

    // console.log(this.element);

    return this.element;
  }

}

export {Card};


// const card = new Card({
//   data: ...,
//   handleCardClick: () => {
//     ...
//   },
//   handleLikeClick: (card) => { // !!! принимается card
//     api.changeLikeCardStatus(card.id(), !card.isLiked())
//       .then(res => {
//         card.setLikesInfo({ ...res }); // !!! метод вызывается у card и передаётся ответ от сервера -- сама карточка
//       })
//       .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
//   },
//   handleDeleteIconClick: (card) => {
//     // здесь аналогично
//   },
// }, cardsConfig.cardSelector);

class Card {

  constructor({card, handleCardClick, handleLikeClick, handleDeleteClick}, userId, templateSelector) {
    this._card = card;
    this.name = card.name;
    this.id = card._id;
    this.link = card.link;
    this._likes = card.likes;
    this._owner = card.owner;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._templateSelector = templateSelector;
  }

  _getElement() {
    const newCardElement = document.querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return newCardElement;
  }

  getId() {
    return this.id;
  }

  _setTitle() {
    this.element.querySelector('.element__title').textContent = this.name;
    return this.element;
  }

  _setAttribute() {
    this.element.setAttribute("data-card-id", this.id);
  }

  _setImage() {
   this._newCardImage = this.element.querySelector('.element__image');
   this._newCardImage.src = this.link;
   this._newCardImage.alt = this.name;
  }

  _setLike() {
    this._newCardLike = this.element.querySelector('.element__like');
  }

  _setLikesAmountCounter() {
    this._newCardLikeAmount = this.element.querySelector('.element__like-amount');
  }

  _checkLikes() {
    this._likes.some(function(likeAuthor) {
      if (likeAuthor._id === this._userId) {
        this._newCardLike.classList.add('element__like_active');
      }
    }.bind(this));
  }

  setLikesAmount(card) {
    this._newCardLikeAmount.textContent = card.likes.length;
  }

  isLiked() {
    return this._newCardLike.classList.contains('element__like_active');
  }

  _setDelete() {
    this._newCardDelete = this.element.querySelector('.element__delete');
  }

  _checkDelete() {
    if (this._owner._id != this._userId) {
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
      this._handleCardClick(this);
    });

    this._newCardLike.addEventListener('click', () => {
      this._handleLikeClick(this);
    })

    this._newCardDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    })

  }

  generate() {
    this.element = this._getElement();
    this._setTitle();
    this._setAttribute();
    this._setImage();
    this._setLike();
    this._setLikesAmountCounter();
    this._checkLikes();
    this.setLikesAmount(this._card);
    this._setDelete();
    this._checkDelete();

    this._setEventListeners();

    return this.element;
  }

};

export {Card};

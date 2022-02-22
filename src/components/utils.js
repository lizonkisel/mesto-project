  /* Открыть/закрыть поп-ап "Редактировать профиль" */

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

  /* Очистить название */

function cleanTitle(title) {
  title.textContent = '';
}

export {openPopup, closePopup, cleanTitle};

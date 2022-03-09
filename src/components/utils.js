  /* Открыть/закрыть поп-ап "Редактировать профиль" */

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEscape);
}

  /* Очистить название */

function cleanTitle(title) {
  title.textContent = '';
}

  /* Закрыть поп-ап по нажатию на "Escape" */

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const loadingText = 'Сохранение...';

function changeLoadingText(isLoading, popup) {
  console.log(isLoading);
  if (isLoading === true) {
    popup.querySelector('.form__button-submit').textContent = loadingText;
  }
}

export {openPopup, closePopup, cleanTitle, changeLoadingText};

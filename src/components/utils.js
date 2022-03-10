import {popupNewPlace} from './modal.js';

/* Открыть/закрыть поп-ап "Редактировать профиль" */

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEscape);
}

  /* Закрыть поп-ап по нажатию на "Escape" */

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

  /* Изменить текст кнопки "Submit" */

function changeSubmitText(isLoading, popup) {
  const loadingText = 'Сохранение...';
  const buttonSubmit = popup.querySelector('.form__button-submit');
  if (isLoading === true) {
    buttonSubmit.textContent = loadingText;
  } else {
    if (popup === popupNewPlace) {
      buttonSubmit.textContent = "Создать";
    } else {
      buttonSubmit.textContent = "Сохранить";
    }
  }
}

export {openPopup, closePopup, changeSubmitText};

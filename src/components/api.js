import { renderCard } from "./card.js";
import {profileName, profileDescription, setProfileData} from './modal.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7/',
  authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
}

export function getCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: config.authorization
    }
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .catch(function(error) {
    console.log(`Ошибка ${error}`);
  })
}

/* Функцию renderInitialCards переписать так, чтобы GET-запрос можно было использовать повторно.
В том числе для получения количества дайков у каждой из карточек */

export function changeNameOnServer(inputName, inputDesc) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name:  inputName.value,
      about:  inputDesc.value
    })
  })

}

export function getProfileDatafromServer() {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: config.authorization,
        'Content-Type': 'application/json'
      }
    }
  )
}

export function postNewPlaceOnServer(image, name) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      link: image.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(error)
    }
  })
  .then(res => console.log(res))
  .catch(error => console.log(`Ошибка:${error.status} ${error.statusText}`))
}

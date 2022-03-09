const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7/',
  authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
  contentType: 'application/json'
}

function getProfileDataFromServer() {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: config.authorization,
        'Content-Type': config.contentType
      }
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
}

function getCardsFromServer() {
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
}

function changeNameOnServer(inputName, inputDesc) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': config.contentType
    },
    body: JSON.stringify({
      name:  inputName.value,
      about:  inputDesc.value
    })
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
}

function postNewPlaceOnServer(image, name) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.authorization,
      'Content-Type': config.contentType
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
      return Promise.reject(res)
    }
  })
}

function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorization
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

function putLike(card) {
  const cardId = card._id;
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.authorization,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

function deleteLike(card) {
  const cardId = card._id;
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorization,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

function changeAvatarOnServer(link) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': config.contentType
    },
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

export {getProfileDataFromServer, getCardsFromServer, changeNameOnServer,
  postNewPlaceOnServer, deleteCardFromServer, putLike, deleteLike, changeAvatarOnServer}

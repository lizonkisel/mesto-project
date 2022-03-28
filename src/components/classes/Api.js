// Пока весь код тестово-начальный - ни на что не влияет.
// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort7/',
//   authorization: 'ecd6f0c2-01ba-4d99-a774-de79c1d44e1d',
//   contentType: 'application/json'
// }

export default class Api {
  constructor({baseUrl, authorization, contentType}) {
    this.baseUrl = baseUrl,
    this.authorization = authorization;
    this.contentType = contentType;
  }

  processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }


  getProfileDataFromServer() {
    return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this.authorization,
          'Content-Type': this.contentType
        }
      })
      .then(this.processResponse)
  }

  getCardsFromServer() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      }
    })
    .then(this.processResponse)
  }

  changeNameOnServer(inputName, inputDesc) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name:  inputName.value,
        about:  inputDesc.value
      })
    })
    .then(this.processResponse)
  }

  postNewPlaceOnServer(image, name) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: name.value,
        link: image.value
      })
    })
    .then(this.processResponse)
  }


  postNewPlaceOnServer(image, name) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: name.value,
        link: image.value
      })
    })
    .then(this.processResponse)
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization
      }
    })
    .then(this.processResponse)
  }

  putLike(card) {
    const cardId = card._id;
    return fetch(`${this.baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization,
      }
    })
    .then(this.processResponse)
  }

  deleteLike(card) {
    const cardId = card._id;
    return fetch(`${this.baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      }
    })
    .then(this.processResponse)
  }

  changeAvatarOnServer(link) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this.processResponse)
  }



  getApi() {
    console.log('Дошел до Api');

  }


}

// const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// });

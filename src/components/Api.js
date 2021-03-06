class Api {
  constructor(apiConfig) {
    this.baseUrl = apiConfig.baseUrl;
    this.headers = apiConfig.headers;
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getProfileDataFromServer() {
    return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.headers
      })
      .then((res) => this._processResponse(res))
  }

  getCardsFromServer() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
    .then((res) => this._processResponse(res))
  }

  changeNameOnServer(inputName, inputWork) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        // name:  inputName.value,
        // about:  inputDesc.value
        name:  inputName,
        about:  inputWork
      })
    })
    .then((res) => this._processResponse(res))
  }

  postNewPlaceOnServer(image, name) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        // name: name.value,
        // link: image.value
        name: name,
        link: image
      })
    })
    .then((res) => this._processResponse(res))
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then((res) => this._processResponse(res))
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then((res) => this._processResponse(res))
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then((res) => this._processResponse(res))
  }

  changeAvatarOnServer(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => this._processResponse(res))
  }
};

export {Api};

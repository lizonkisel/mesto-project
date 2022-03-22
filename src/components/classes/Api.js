// Пока весь код тестово-начальный - ни на что не влияет.
export class Api {
  constructor(baseUrl, folder, method ) {
    this._baseUrl = baseUrl,
    this._folder = folder,
    this._method = method
  }

  getInitialCards() {
        return fetch().then()
    // ...
  }

  processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getProfileDataFromServer() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: config.authorization,
          'Content-Type': config.contentType
        }
      })
      .then(processResponse)
  }

}

// const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// });

class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this._profileNameElement = document.querySelector(userNameSelector);
    this._profileDescriptionElement = document.querySelector(userDescriptionSelector);
    this._profileAvatarElement = document.querySelector(userAvatarSelector);
    this._userData = {};
  }

  getUserInfo () {
    // return this._userData[parameter];
    return this._userData;
  }

  setUserInfo(data) {

    this._profileNameElement.textContent = data.name;
    this._profileDescriptionElement.textContent = data.about;
    this._profileAvatarElement.src = data.avatar;

    this._userData.name = data.name;
    this._userData.description = data.about;
    this._userData.image = data.avatar;
    this._userData.id = data._id;
  }
};

export {UserInfo};

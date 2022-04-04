class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this.profileNameElement = document.querySelector(userNameSelector);
    this.profileDescriptionElement = document.querySelector(userDescriptionSelector);
    this.profileAvatarElement = document.querySelector(userAvatarSelector);
    this.userData = {};
  }

  getUserInfo (parameter) {
    return this.userData[parameter];
  }

  setUserInfo(data) {

    this.profileNameElement.textContent = data.name;
    this.profileDescriptionElement.textContent = data.about;
    this.profileAvatarElement.src = data.avatar;

    this.userData.name = data.name;
    this.userData.description = data.about;
    this.userData.image = data.avatar;
    this.userData.id = data._id;
  }
};

export {UserInfo};

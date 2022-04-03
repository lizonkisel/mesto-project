
export class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this.profileNameElement = document.querySelector(userNameSelector);
    this.profileDescriptionElement = document.querySelector(userDescriptionSelector);
    this.profileAvatarElement = document.querySelector(userAvatarSelector);
    console.log(this.profileAvatarElement);
    this.userData = {};
  }

  getUserInfo (data) {
    // console.log(data);

    // this.profileNameElement.textContent = data.name;
    // this.profileDescriptionElement.textContent = data.about;
    // this.profileAvatarElement.src = data.avatar;

    // this.userData.name = data.name;
    // this.userData.description = data.about;
    // this.userData.image = data.avatar;
    // this.userData.id = data._id;

    this.setUserInfo(data);

    return this.userData;
  }

  setUserInfo(data) {
    this.profileNameElement.textContent = data.name;
    this.profileDescriptionElement.textContent = data.about;
    this.profileAvatarElement.src = data.avatar;

    // this._profileAvatar.src = newDate.avatar;
  }
}

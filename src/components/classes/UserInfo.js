
export class UserInfo {
  constructor( { profileName, profileDescription, profileAvatar, profileData }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;
    this._profileData = profileData;
  }

  getUserInfo = (data) => {
    this.setUserInfo(data);
  }

  setUserInfo = (newDate) => {
    this._profileName.textContent = newDate.name;
    this._profileDescription.textContent = newDate.about;
    this._profileAvatar.src = newDate.avatar;
  }
}


export class UserInfo {
  constructor( { profileName, profileDescription, profileAvatar, profileData }) {
    this.profileName = profileName;
    this.profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;
    this._profileData = profileData;
  }

  getUserInfo = (data) => {
    this.setUserInfo(data);
  }

  setUserInfo = (newDate) => {
    this.profileName.textContent = newDate.name;
    this.profileDescription.textContent = newDate.about;
    this._profileAvatar.src = newDate.avatar;
  }
}

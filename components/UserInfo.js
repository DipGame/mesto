export default class UserInfo {
    constructor({ userName, userProfession, userAvatar, userId }) {
        this._userName = userName;
        this._userProfession = userProfession;
        this._userAvatar = userAvatar;
        this._userId = userId;
    }

    getUserInfo() {
        return {
            name: this._userName,
            about: this._userProfession,
            avatar: this._userAvatar,
            _id: this._userId
        }
    }

    setUserInfo({ name, about, avatar, _id, owner }) {
        this._userName.textContent = name;
        this._userProfession.textContent = about;
        this._userAvatar.style.backgroundImage = `url(${avatar})`
        this._userId = _id;
        owner = this._userId;
    }
}
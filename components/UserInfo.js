export default class UserInfo {
    constructor({userName, userProfession, userAvatar, userId}) {
        this._userName = userName;
        this._userProfession = userProfession;
        this._userAvatar = userAvatar;
        this._userId = userId;
    }

    getUserInfo({name, about, avatar, _id}) {
        this._userName.textContent = name;
        this._userProfession.textContent = about;
        this._userAvatar.style.backgroundImage = `url(${avatar})`
        this._userId = _id;
    }

    setUserInfo({name, about, avatar, _id}) {
        this._userName.textContent = name;
        this._userProfession.textContent = about;
        this._userAvatar.style.backgroundImage = `url(${avatar})`
        this._userId = _id;
    }
}
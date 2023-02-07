export default class UserInfo {
    constructor({userName, userProfession}) {
        this._userName = userName;
        this._userProfession = userProfession;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            profession: this._userProfession.textContent
        }
    }

    setUserInfo(name, profession) {
        this._userName.textContent = name.value;
        this._userProfession.textContent = profession.value;
    }
}
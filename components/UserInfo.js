export default class UserInfo {
    constructor(name, profession) {
        this._name = name;
        this._profession = profession;
    }

    getUserInfo(inputName, inputProf) {
        inputName.value = this._name.textContent;
        inputProf.value = this._profession.textContent;
    }

    setUserInfo(inputName, inputProf) {
        this._name.textContent = inputName.value
        this._profession.textContent = inputProf.value;
    }

}
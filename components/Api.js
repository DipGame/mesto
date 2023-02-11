export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse() {
        return (response) => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(new Error('Что-то пошло не так....'))
        }
    }

    getAllCards() {
        return fetch(`${this._url}/v1/cohort-58/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse())
    }

    getUserInfo() {
        return fetch(`${this._url}/v1/cohort-58/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse())

    }

    createNewCard(nameImg, linkImg) {
        return fetch(`${this._url}/v1/cohort-58/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: nameImg,
                link: linkImg
            })
        })
            .then(this._checkResponse())
    }

    setUserInfo(nameUser, aboutUser) {
        return fetch(`${this._url}/v1/cohort-58/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: nameUser,
                about: aboutUser
            })
        })
            .then(this._checkResponse())
    }

    createNewAvatar(url) {
        return fetch(`${this._url}/v1/cohort-58/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url,
            })
        })
            .then(this._checkResponse())
    }

    deleteCards(id) {
        return fetch(`${this._url}/v1/cohort-58/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._checkResponse())
    }

    likesAdd(id) {
        return fetch(`${this._url}/v1/cohort-58/cards/${id}/likes`, {
            headers: this._headers,
            method: 'PUT',
        })
            .then(this._checkResponse())
    }

    likesDelete(id) {
        return fetch(`${this._url}/v1/cohort-58/cards/${id}/likes`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._checkResponse())
    }
}

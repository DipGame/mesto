export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    getAllCards() {
        return fetch(`${this._url}/v1/cohort-58/cards`, {
            headers: this._headers
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(new Error('Что-то пошло не так....'))
            })
    }

    getUserInfo(nameUser, profUser, avatarUser) {
        return fetch(`${this._url}/v1/cohort-58/users/me`, {
            headers: this._headers
        })
            .then(res => res.json())
            .then((result) => {
                nameUser.textContent = result.name;
                profUser.textContent = result.about;
                avatarUser.style.backgroundImage = `url(${result.avatar})`;
            })
            
    }

    createNewCard(nameImg, linkImg) {
        return fetch(`${this._url}/v1/cohort-58/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: nameImg.value,
                link: linkImg.value
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
    }

    setUserInfo(userName, userProf) {
        return fetch(`${this._url}/v1/cohort-58/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: userName.textContent,
                about: userProf.textContent
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((result) => {
                console.log(result)
            });
    }

    createNewAvatar(url) {
        return fetch(`${this._url}/v1/cohort-58/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url.value,
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((result) => {
                console.log(result)
            });
    }

    deleteCards(id) {
        return fetch(`${this._url}/v1/cohort-58/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
    }

    likesAdd(id) {
        return fetch(`${this._url}/v1/cohort-58/cards/${id}/likes`, {
            headers: this._headers,
            method: 'PUT',
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
    }
    
    likesDelete(id) {
        return fetch(`${this._url}/v1/cohort-58/cards/${id}/likes`, {
            headers: this._headers,
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
    }
}

class Card {
    constructor(data, { handleOpenPopupAsk, addDeleteLikeCard, check, idUser }, selector, handleClick) {
        this._name = data.name;
        this._link = data.link;
        this._handleOpenPopupAsk = handleOpenPopupAsk;
        this._selector = selector;
        this._addDeleteLikeCard = addDeleteLikeCard;
        this._check = check;
        this._handleClick = handleClick;
        this._id = data._id;
        this._idUser = idUser;
        this._likes = data.likes;
        this._owner = data.owner;
    }

    _getTemplateCard() {
        const card = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
        return card;
    }

    deleteCard() {
        this._newCard.remove();
    }

    _cardLike() {
        this._likeButton.classList.toggle('element__like_active');
    }

    handleLikeCard(res) {
        if (this.checkUserLikeId() === true) {
            this._cardLike();
            this._likesNumber.textContent = res.likes.length;
            this._likes = res.likes;
        } else {
            this._cardLike();
            this._likesNumber.textContent = res.likes.length
            this._likes = res.likes;
        }
    }

    checkUserLikeId() {
        const array = Object.keys(this._likes);
        const result = array.map((key) => {
            const value = this._likes[key];
            return value._id;
        })
        return result.includes(this._idUser);
    }

    getIdCard() {
        return this._id;
    }

    _checkUserId() {
        if (this._owner._id != this._idUser) {
            this._newCard.querySelector('.element__delete').remove();
        }
    }

    _setEventListeners() {
        const deleteCard = this._newCard.querySelector('.element__delete');
        deleteCard.addEventListener('click', () => this._handleOpenPopupAsk())

        this._likesNumber = this._newCard.querySelector('.element__number');
        this._likesNumber.textContent = this._likes.length;
        this._likeButton = this._newCard.querySelector('.element__like');
        this._likeButton.addEventListener('click', () => this._addDeleteLikeCard());

        this._checkUserId()
        if (this.checkUserLikeId() === true) {
            this._likeButton.classList.add('element__like_active');
        }

        this._imgOpen = this._newCard.querySelector('.element__image');
        this._imgOpen.addEventListener('click', () => this._handleClick(this._name, this._link));
    }

    _setData() {
        const name = this._newCard.querySelector('.element__title');
        name.textContent = this._name;

        const link = this._newCard.querySelector('.element__image');
        link.src = this._link;
        link.alt = this._name;
    }

    getView() {
        this._newCard = this._getTemplateCard();
        this._setEventListeners();
        this._setData();
        return this._newCard;
    }
}

export default Card;
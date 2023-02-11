class Card {
    constructor({ name, link, handleDeleteCard, handleLikeCardAddServer, handleLikesDeleteCard, _id, likes, owner }, selector, handleClick) {
        this._name = name;
        this._link = link;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCardAddServer = handleLikeCardAddServer;
        this._handleLikesDeleteCard =handleLikesDeleteCard;
        this._selector = selector;
        this._handleClick = handleClick;
        this._id = _id;
        this._likes = likes;
        this._owner = owner;
    }

    _getTemplateCard() {
        const card = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
        return card;
    }

    _handleLikeCard(id) {
        if (this._checkUserLikeId() === true) {
            this._likeButton.classList.remove('element__like_active');
            this._likesNumber.textContent = this._likes.length - 1;
            this._handleLikesDeleteCard(id);

        } else {
            this._likeButton.classList.add('element__like_active');
            this._likesNumber.textContent = this._likes.length + 1;
            this._handleLikeCardAddServer(id);
            console.log('лайк поставлен')
        }
    }

    _handleDelete(element) {
        element.classList.add('overlay_open');
        element.querySelector('.ask__button').addEventListener('click', () => {
            this._newCard.remove();
            this._handleDeleteCard(this._id);
        })
    }

    _checkUserLikeId() {
        const array = Object.keys(this._likes); // [1, 2]
        const result = array.map((key) => {
            const value = this._likes[key];
            return value._id;
        })
        return result.includes('8dbbd03b548204150c9c45d0');
    }


    _checkUserId() {
        if (this._owner != '8dbbd03b548204150c9c45d0') {
            this._newCard.querySelector('.element__delete').remove();
        }
    }

    _setEventListeners(element) {
        const deleteCard = this._newCard.querySelector('.element__delete');
        deleteCard.addEventListener('click', () => this._handleDelete(element))

        this._likesNumber = this._newCard.querySelector('.element__number');
        this._likesNumber.textContent = this._likes.length;
        this._likeButton = this._newCard.querySelector('.element__like');
        this._likeButton.addEventListener('click', () => this._handleLikeCard(this._id));
        this._checkUserId()

        if (this._checkUserLikeId() === true) {
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

    getView(element) {
        this._newCard = this._getTemplateCard();
        this._setEventListeners(element);
        this._setData();

        return this._newCard;
    }
}

export default Card;
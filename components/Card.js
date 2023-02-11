import { askPopup } from "../pages/index.js";
import { api } from "../pages/index.js";

class Card {
    constructor({ name, link, handleOpenPopupAsk, _id, likes, owner }, selector, handleClick) {
        this._name = name;
        this._link = link;
        this._handleOpenPopupAsk = handleOpenPopupAsk;
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

    deleteCard() {
        this._newCard.remove();
    }

    _cardLike() {
        this._likeButton.classList.toggle('element__like_active');
    }

    _handleLikeCard() {
        if (this._checkUserLikeId() === true) {
            api.likesDelete(this._id)
                .then((res) => {
                    console.log(res.likes.length);
                    this._cardLike();
                    this._likesNumber.textContent = res.likes.length

                })
        } else {
            api.likesAdd(this._id)
                .then((res) => {
                    console.log(res.likes.length);
                    this._cardLike();
                    this._likesNumber.textContent = res.likes.length
                })
            console.log('лайк поставлен')
        }
    }

    _checkUserLikeId() {
        const array = Object.keys(this._likes);
        const result = array.map((key) => {
            const value = this._likes[key];
            return value._id;
        })
        return result.includes(this._owner);
    }

    getIdCard() {
        return this._id
    }

    _checkUserId() {
        if (this._owner != '8dbbd03b548204150c9c45d0') {
            this._newCard.querySelector('.element__delete').remove();
        }
    }

    _setEventListeners() {
        const deleteCard = this._newCard.querySelector('.element__delete');
        deleteCard.addEventListener('click', () => this._handleOpenPopupAsk())

        askPopup.setEventListeners(this._id, this._newCard);


        this._likesNumber = this._newCard.querySelector('.element__number');
        this._likesNumber.textContent = this._likes.length;
        this._likeButton = this._newCard.querySelector('.element__like');
        this._likeButton.addEventListener('click', () => this._handleLikeCard());

        this._checkUserId();
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

    getView() {
        this._newCard = this._getTemplateCard();
        this._setEventListeners();
        this._setData();
        return this._newCard;
    }
}

export default Card;
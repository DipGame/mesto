import {handleOpenPicture, getTemplateCard} from './index.js';

class Card {
    constructor({ name, link }) {
        this._name = name;
        this._link = link;
        this._getTemplateCard = getTemplateCard;
    }

    _handleDeleteCard() {
        this._newCard.remove();
    }

    _handleLikeCard() {
        this._likeButton.classList.toggle('element__like_active');
    }

    _handleImgOpen() {
        handleOpenPicture(event);
    }

    _setEventListeners() {
        const deleteCard = this._newCard.querySelector('.element__delete');
        deleteCard.addEventListener('click', () => this._handleDeleteCard())

        this._likeButton = this._newCard.querySelector('.element__like');
        this._likeButton.addEventListener('click', () => this._handleLikeCard());

        this._imgOpen = this._newCard.querySelector('.element__image');
        this._imgOpen.addEventListener('click', () => this._handleImgOpen());
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
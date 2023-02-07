import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(elementDom, element) {
        super(elementDom);
        this._element = element;
        this._picture = elementDom.querySelector('.img-form__picture');
        this._title = elementDom.querySelector('.img-form__title');
    }

    open(name, link) {
        this._picture.src = link;
        this._picture.alt = link;
        this._title.textContent = name
        super.open();
    }
}

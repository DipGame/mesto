import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(elementDom, element) {
        super(elementDom);
        this._element = element
    }

    open(name, img) {
        const imgElementTg = event.target.closest(this._element);
        img.src = event.target.src;
        img.alt = imgElementTg.textContent;
        name.textContent = imgElementTg.textContent;
        super.open();
    }
}

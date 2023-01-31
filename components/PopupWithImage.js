import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(name, img, element) {
        const imgElementTg = event.target.closest(element);
        img.src = event.target.src;
        img.alt = imgElementTg.textContent;
        name.textContent = imgElementTg.textContent;
        super.open();
    }
}

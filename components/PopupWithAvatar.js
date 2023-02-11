import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {

    setEventListeners() {
        super.setEventListeners();

        this._elementDom.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.close();
        })
}
}
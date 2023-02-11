import Popup from "./Popup.js";

export default class PopupWithAsk extends Popup {
    // constructor(elementDom, {handleYesButton}) {
    //     super(elementDom);
    //     // this._handleYesButton = handleYesButton;
    // }

    // open(id) {
    //     super.open();
    //     this._elementDom.querySelector('.popup__save-button').addEventListener('click', this._handleYesButton(id));
    // }

    setEventListeners() {
        super.setEventListeners();

        this._elementDom.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.close();
        })
    }
}
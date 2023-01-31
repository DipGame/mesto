import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import {enableValidation} from "../pages/index.js";


export default class PopupWithForm extends Popup {
    constructor(selector, { submitForm }) {
        super(selector);
        this._submitForm = submitForm;
        this._nameInput = this._selector.querySelector('.popup__input_one');
        this._profInput = this._selector.querySelector('.popup__input_two');
        this._submitButton = this._selector.querySelector('.popup__submit')
    }

    _getInputValues(one, two) {
        one.textContent = this._nameInput.value;
        two.textContent = this._profInput.value;
        this.close();
    }

    close() {
        const buttonOff = new FormValidator(enableValidation, this._selector);
        buttonOff.disableSubmit(this._submitButton);
        super.close();
    }

    setEventListeners(one, two) {
        super.setEventListeners()
        this._selector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this._getInputValues(one, two)
        })
    }
}
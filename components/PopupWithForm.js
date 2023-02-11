import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(elementDom, {submitForm , disableSubmitButton}) {
        super(elementDom);
        this._submitForm = submitForm;
        this._inputs = this._elementDom.querySelectorAll('.popup__input')
        this._submitButton = this._elementDom.querySelector('.popup__submit')
        this._disableSubmitButton = disableSubmitButton;
    }

    _getInputValues() {
        this._value = {};
        this._inputs.forEach(element => {
            this._value[element.name] = element.value;
        })
        return this._value
    }


    close() {
        super.close();
        this._elementDom.querySelector('.popup').reset();
    }

    setEventListeners() {
        super.setEventListeners()

        this._elementDom.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues())
            this._disableSubmitButton();
        })
    }
}
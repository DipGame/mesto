class FormValidator {
    constructor(enableValidation, form) {
        this._formSelector = form;
        this._inputSelector = enableValidation.inputSelector;
        this._submitButtonSelector = enableValidation.submitButtonSelector;
        this._inactiveButtonClass = enableValidation.inactiveButtonClass;
        this._inputErrorClass = enableValidation.inputErrorClass;
        this._errorClass = enableValidation.errorClass;
    };

    _showInputError(formElement, inputElement, errorMessage) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };

    _hideInputError(formElement, inputElement) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement);
            }, 0);
        })

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidationFunction(settings) {
        const formList = this._formSelector;
        formList.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners(formList);
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    disableSubmit(button) {
        button.classList.add('button_inactive');
        button.disabled = true;
    }
};

export default FormValidator;
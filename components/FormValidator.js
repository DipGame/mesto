class FormValidator {
    constructor(enableValidation, form) {
        this._form = form;
        this._inputSelector = enableValidation.inputSelector;
        this._submitButtonSelector = enableValidation.submitButtonSelector;
        this._inactiveButtonClass = enableValidation.inactiveButtonClass;
        this._inputErrorClass = enableValidation.inputErrorClass;
        this._errorClass = enableValidation.errorClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    };

    _showInputError(inputElement, errorMessage) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this._toggleButtonState();

        this._form.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState();
            }, 0);
        })

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidationFunction() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    disableSubmit() {
        this._buttonElement.classList.add('button_inactive');
        this._buttonElement.disabled = true;
    }
};

export default FormValidator;
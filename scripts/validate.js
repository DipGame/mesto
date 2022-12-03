const errorUserMassage = avatarOverlayEl.querySelector('#errorUserName');
const errorProfMassage = avatarOverlayEl.querySelector('#errorProfName');
const errorPlaceName = placeavatarOverlayEl.querySelector('#errorPlaceName');
const errorPlaceUrl = placeavatarOverlayEl.querySelector('#errorPlaceUrl');
const popupError = avatarOverlayEl.querySelector('.popup__error');


const showError = (input, errorText) => {
  input.classList.add('popup__error-active');
  input.textContent = errorText;
}

const hideError = (input, saveButton, errorActive) => {
  input.classList.remove('popup__error-active');
  if (!errorActive.classList.contains('popup__error-active')) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__save-button-disabled');
  }
};

const checkInputValidity = (idInput, idErrorMassage, saveButton, errorActive) => {
    const noText = 'Вы пропустили это поле.';
    const minLimitText = `Минимальное количество символов: 2. Длина текста сейчас: ${idInput.value.length} символ.`;
    const maxLimit30Text = `Максимальное количество символов: 30. Длина текста сейчас: ${idInput.value.length} символ.`;
    const maxLimit40Text = `Максимальное количество символов: 40. Длина текста сейчас: ${idInput.value.length} символ.`;
    const maxLimit200Text = `Максимальное количество символов: 200. Длина текста сейчас: ${idInput.value.length} символ.`;
    const noUrlText = 'Введите адрес сайта.';
    if (!idInput.value) {
      showError(idErrorMassage, noText);
      idInput.style.borderBottom = '1px solid red';
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__save-button-disabled');
    } 
    else if (!idInput.validity.valid) {
      showError(idErrorMassage, noUrlText);
      idInput.style.borderBottom = '1px solid red';
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__save-button-disabled');
  }
    else if (idInput.value.length < 2) {
      showError(idErrorMassage, minLimitText);
      idInput.style.borderBottom = '1px solid red';
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__save-button-disabled');
    } 
    else if (idInput.value.length > 30 && idInput === placeName) {
      showError(idErrorMassage, maxLimit30Text);
      idInput.style.borderBottom = '1px solid red';
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__save-button-disabled');
  }
    else if (idInput.value.length > 40 && idInput === avatarName) {
        showError(idErrorMassage, maxLimit40Text);
        idInput.style.borderBottom = '1px solid red';
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add('popup__save-button-disabled');
    }
    else if (idInput.value.length > 200 && idInput === avatarProf) {
        showError(idErrorMassage, maxLimit200Text);
        idInput.style.borderBottom = '1px solid red';
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add('popup__save-button-disabled');
    }
    
    else {
      hideError(idErrorMassage, saveButton, errorActive);
      idInput.style.borderBottom = '1px solid #000';
    } 
    };

avatarName.addEventListener('input', function () {
    checkInputValidity(avatarName, errorUserMassage, popupSaveButton, popupError);
  });

  avatarProf.addEventListener('input', function () {
    checkInputValidity(avatarProf, errorProfMassage, popupSaveButton, popupError);
  });

  placeName.addEventListener('input', function () {
    checkInputValidity(placeName, errorPlaceName, placeSaveButton, popupError);
  });

  placeUrl.addEventListener('input', function () {
    checkInputValidity(placeUrl, errorPlaceUrl, placeSaveButton, popupError);
  });

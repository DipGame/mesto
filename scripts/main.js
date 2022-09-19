let overlayEl = document.querySelector('.overlay');
let popupForm = overlayEl.querySelector('.popup')
let popupName = overlayEl.querySelector('input[name="name"]');
let popupProf = overlayEl.querySelector('input[name="profession"]');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let savePopupButton = overlayEl.querySelector('.popup__save-button');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector(".profile__name");
let profileProf = profile.querySelector(".profile__profession");


let toggleOverlay = () => {
    if (overlayEl.classList.toggle('overlay_open'))
    popupName.value = profileName.textContent;
    popupProf.value = profileProf.textContent;
}

openPopupButton.addEventListener('click', toggleOverlay);

closePopupButton.addEventListener('click', toggleOverlay);

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileProf.textContent = popupProf.value;

    toggleOverlay();
}

overlayEl.addEventListener('submit', formSubmitHandler);


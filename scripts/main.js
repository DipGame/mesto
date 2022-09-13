const overlayEl = document.querySelector('.overlay');
const popupName = overlayEl.querySelector('.popup__name');
const popupProf = overlayEl.querySelector('.popup__profession');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = overlayEl.querySelector('.popup__save-button');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector(".profile__name");
let profileProf = profile.querySelector(".profile__profession");

const toggleOverlay = () => {
    overlayEl.classList.toggle('overlay__open');
}

openPopupButton.addEventListener('click', () => {
    toggleOverlay();
})

closePopupButton.addEventListener('click', () => {
    toggleOverlay();
})

savePopupButton.addEventListener('click', () => {
    profileName.textContent = popupName.value;
    profileProf.textContent = popupProf.value;
    toggleOverlay();
})

overlayEl.addEventListener('submit', savePopupButton);
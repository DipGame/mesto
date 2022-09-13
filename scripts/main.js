const overlayEl = document.querySelector('.overlay');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = overlayEl.querySelector('.popup__save-button');

const toggleOverlay = () => {
    overlayEl.classList.toggle('overlay__open');
}

openPopupButton.addEventListener('click', () => {
    toggleOverlay();
})

closePopupButton.addEventListener('click', () => {
    toggleOverlay();
})
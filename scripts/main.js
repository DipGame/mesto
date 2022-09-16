let overlayEl = document.querySelector('.overlay');
let popupName = overlayEl.querySelector('input[name="name"]');
let popupProf = overlayEl.querySelector('input[name="profession"]');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let savePopupButton = overlayEl.querySelector('.popup__save-button');



let toggleOverlay = () => {
    overlayEl.classList.toggle('overlay_open');
}

openPopupButton.addEventListener('click', toggleOverlay);

closePopupButton.addEventListener('click', toggleOverlay);



function formSubmitHandler (evt) {
    evt.preventDefault();

    let newName = popupName.value;
    let newProf = popupProf.value;

    let profile = document.querySelector('.profile');
    let profileName = profile.querySelector(".profile__name");
    let profileProf = profile.querySelector(".profile__profession");

    profileName.textContent = newName;
    profileProf.textContent = newProf;
}
savePopupButton.addEventListener('click', formSubmitHandler);

overlayEl.addEventListener('submit', formSubmitHandler);


//Начало Попапа для редактирования профиля
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
    if (!overlayEl.classList.contains('overlay_open')) {
    popupName.value = profileName.textContent;
    popupProf.value = profileProf.textContent;
}
    overlayEl.classList.toggle('overlay_open');
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
//Конец Попапа для редактирования профиля



//Начало кнопки удалить
document.querySelector('.elements').onclick = function(e) {
    const btn = e.target.closest('.element__delete');
        if (!btn) {
        return;
    }
        btn.closest('.element').remove();
    }
//Конец кнопки удалить


//Начало Place(Типа попапа, только для добавления новых картинок)
let placeOverlayEl = document.querySelector('.place-overlay');
let placeForm = overlayEl.querySelector('.place')
let placeName = overlayEl.querySelector('input[name="placeName"]');
let placeUrl = overlayEl.querySelector('input[name="placeUrl"]');
let openPlaceButton = document.querySelector('.profile__add-button');
let closePlaceButton = document.querySelector('.place__close-button');
let addPlaceButton = overlayEl.querySelector('.place__add-button');

let togglePlaceOverlay = () => {
    placeOverlayEl.classList.toggle('place-overlay_open');
}

openPlaceButton.addEventListener('click', togglePlaceOverlay);

closePlaceButton.addEventListener('click', togglePlaceOverlay);



//Конец Place(Типа попапа, только для добавления новых картинок)


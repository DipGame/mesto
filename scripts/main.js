//Начало Попапа для редактирования профиля
let overlayEl = document.querySelector('.overlay');
let popupForm = overlayEl.querySelector('.popup')
let popupName = overlayEl.querySelector('input[name="name"]');
let popupProf = overlayEl.querySelector('input[name="profession"]');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
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

let togglePlaceOverlay = () => {
    placeOverlayEl.classList.toggle('place-overlay_open');
}

openPlaceButton.addEventListener('click', togglePlaceOverlay);

closePlaceButton.addEventListener('click', togglePlaceOverlay);

let initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

function placeAdd (evt) {
    evt.preventDefault();

    initialCards.unshift({
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    });

    togglePlaceOverlay();
}

placeOverlayEl.addEventListener('submit', placeAdd);

let cardItem = ''

let out = document.getElementById('elements')
initialCards.forEach ((menu) => {
    cardItem +=
    `
<div class="element">
    <button class="element__delete" type="button"></button>
    <img class="element__image" src="${menu.link}" alt="Картинка">
    <div class="element__container-bottom">
        <h2 class="element__title">${menu.name}</h2>
        <button class="element__like" type="button"></button>
    </div>
</div>
    `
})

out.insertAdjacentHTML('afterbegin', cardItem);



//Конец Place(Типа попапа, только для добавления новых картинок)




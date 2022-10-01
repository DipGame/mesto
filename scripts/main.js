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

const pop = ['pop', 'kjds', 'dsadk', 'ds'];

const elementsTemplate = document.querySelector('.elements');
const placeTemplate = document.querySelector('.placeTemplate').content;
const placeAddButton = document.querySelector('.place__add-button');
const placeName = document.querySelector('input[name="placeName"]');
const placeUrl = document.querySelector('input[name="placeUrl"]')

function render() {
  initialCards.forEach(renderinitialCards);
}

function renderinitialCards(menu) {
  const copyPlace = placeTemplate.cloneNode(true);
  const placeTitle = placeTemplate.querySelector('.element__title');
  placeTitle.textContent = name:text;
  elementsTemplate.appendChild(copyPlace);
}

render();

// let togglePlaceOverlay = () => {
//     placeOverlayEl.classList.toggle('place-overlay_open');
// }

// openPlaceButton.addEventListener('click', togglePlaceOverlay);

// closePlaceButton.addEventListener('click', togglePlaceOverlay);



//Конец Place(Типа попапа, только для добавления новых картинок)




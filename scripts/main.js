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





// Начало Place(Типа попапа, только для добавления новых картинок)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Сургут',
    link: 'https://picworld.ru/wp-content/uploads/2017/02/Surgut_05.jpeg'
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


  const placeOverlayEl = document.querySelector('.place-overlay');
  const placeForm = placeOverlayEl.querySelector('.place');
  const placeName = placeOverlayEl.querySelector('input[name="placeName"]');
  const placeUrl = placeOverlayEl.querySelector('input[name="placeUrl"]');
  const openPlaceButton = document.querySelector('.profile__add-button');
  const savePlaceButton = placeOverlayEl.querySelector('.place__add-button');
  const closePlaceButton = placeOverlayEl.querySelector('.place__close-button');

  const imgOverlayEl = document.querySelector('.img-overlay');
  const imgForm = imgOverlayEl.querySelector('.img-form');
  const imgName = imgOverlayEl.querySelector('.img-form__title');
  const imgCloseButton = imgOverlayEl.querySelector('.img-form__close-button');
  const imgPicture = imgOverlayEl.querySelector('.img-form__picture');

const placeToggleOverlay = () => {
  placeOverlayEl.classList.toggle('place-overlay_open');
}

const imgToggleOverlay = () => {
  imgOverlayEl.classList.toggle('img-overlay_open');
}

openPlaceButton.addEventListener('click', placeToggleOverlay);
closePlaceButton.addEventListener('click', placeToggleOverlay);


placeOverlayEl.addEventListener('submit', addCard);

const elementsTemplate = document.querySelector('.elements');
const placeTemplate = document.querySelector('.placeTemplate').content;





function render() {
  initialCards.forEach(loadPlace);
}

function loadPlace({name, link}) {
  const copyPlace = placeTemplate.cloneNode(true);
  const placeTitle = copyPlace.querySelector('.element__title');
  const img = copyPlace.querySelector('.element__image');
  const likeButton = copyPlace.querySelector('.element__like');
  img.src = link; 
  placeTitle.textContent = name; 

document.querySelector('.elements').onclick = function(e) {
  const btn = e.target.closest('.element__delete');
      if (!btn) {
      return;
  }
      btn.closest('.element').remove();
  }

img.addEventListener("click", openPicture);
imgCloseButton.addEventListener("click", imgToggleOverlay);

likeButton.addEventListener("click", likeActive);

  // не забудь листенеры еще для карточки (лайк, иконка корзинки, картинка), если в текущей ПР требуется это делать
  // вот тут...
  
  // только потом вставляй карточку в разметку
  elementsTemplate.appendChild(copyPlace);
}

function openPicture(event) {
  const imgElementTg = event.target.closest('.element');
  imgPicture.src = event.target.src;
  imgName.textContent = imgElementTg.textContent;
  imgToggleOverlay();
}

function likeActive(event) {
  event.target.classList.toggle('element__like_active');
}



function addCard(evt) {
  evt.preventDefault();
  const copyPlace = placeTemplate.cloneNode(true);
  const placeTitle = copyPlace.querySelector('.element__title');
  const img = copyPlace.querySelector('.element__image');
  img.src = placeUrl.value; 
  placeTitle.textContent = placeName.value; 

  elementsTemplate.prepend(copyPlace);

  placeToggleOverlay();
}



render();
//Конец Place(Типа попапа, только для добавления новых картинок)




//Начало Попапа для редактирования профиля
let overlayEl = document.querySelector('.overlay');
let popupForm = overlayEl.querySelector('.popup')
let popupName = overlayEl.querySelector('input[name="name"]');
let popupProf = overlayEl.querySelector('input[name="profession"]');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
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

popupOpenButton.addEventListener('click', toggleOverlay);

popupCloseButton.addEventListener('click', toggleOverlay);

function submitFormHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileProf.textContent = popupProf.value;

    toggleOverlay();
}

overlayEl.addEventListener('submit', submitFormHandler);
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

  const elementsTemplate = document.querySelector('.elements');
  const placeTemplate = document.querySelector('.placeTemplate').content;
  const placeOverlayEl = document.querySelector('.place-overlay');
  const placeForm = placeOverlayEl.querySelector('.place');
  const placeName = placeOverlayEl.querySelector('input[name="placeName"]');
  const placeUrl = placeOverlayEl.querySelector('input[name="placeUrl"]');
  const placeOpenButton = document.querySelector('.profile__add-button');
  const placeSaveButton = placeOverlayEl.querySelector('.place__add-button');
  const placeCloseButton = placeOverlayEl.querySelector('.place__close-button');

  const imgOverlayEl = document.querySelector('.img-overlay');
  const imgForm = imgOverlayEl.querySelector('.img-form');
  const imgName = imgOverlayEl.querySelector('.img-form__title');
  const imgCloseButton = imgOverlayEl.querySelector('.img-form__close-button');
  const imgPicture = imgOverlayEl.querySelector('.img-form__picture');

function render() { //функция рендер карточек из массива
  initialCards.forEach(createPlace);
}

function createPlace({name, link}) { //функция отрисовки карточек
  const copyPlace = placeTemplate.cloneNode(true);
  const placeTitle = copyPlace.querySelector('.element__title');
  const img = copyPlace.querySelector('.element__image');
  const likeButton = copyPlace.querySelector('.element__like');
  const btnDelete = copyPlace.querySelector('.element__delete');

  img.src = link; 
  placeTitle.textContent = name; 

  btnDelete.addEventListener('click', handleDeleteCard); //кнопка удаления

  img.addEventListener("click", openPicture);//кнопка открытия картинки по нажатию на картинку
  imgCloseButton.addEventListener('click', closeImgOverlay);//кнопка закрытия картинки

  likeButton.addEventListener("click", handleLikeActive);//кнопка лайк

  elementsTemplate.appendChild(copyPlace);
}

function newCard(name) {//функция добавления новых карточек
  createPlace();
  link = placeUrl.value;  
  name = placeName.value;  
  elementsTemplate.prepend(name);
}

placeSaveButton.addEventListener('click', newCard);

placeOpenButton.addEventListener('click', openPlaceOverlay);
placeCloseButton.addEventListener('click', closePlaceOverlay);

function openPlaceOverlay() {//функция открытия попапа для добавления картинок
  placeOverlayEl.classList.toggle('place-overlay_open');
}

function closePlaceOverlay() {//функция закрытия попапа для добавления картинок
  placeOverlayEl.classList.remove('place-overlay_open');
}

function openImgOverlay(popup) {//функция открытия попапа для картинок
  imgOverlayEl.classList.toggle(popup);
}

function closeImgOverlay() {//функция закрытия попапа для картинок
  imgOverlayEl.classList.remove('img-overlay_open');
}

const handleDeleteCard = (evt) => { //функция работы кнопки удаления 
  evt.target.closest('.element').remove();
}

function openPicture(event) {//функция открытия картинки по нажатию на картинку
  const imgElementTg = event.target.closest('.element');
  imgPicture.src = event.target.src;
  imgName.textContent = imgElementTg.textContent;
  openImgOverlay('img-overlay_open');
}

function handleLikeActive(event) {//функция лайка
  event.target.classList.toggle('element__like_active');
}

render();
//Конец Place(Типа попапа, только для добавления новых картинок)




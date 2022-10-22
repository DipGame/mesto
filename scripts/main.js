//Начало Попапа для редактирования профиля
const popupOverlayEl = document.querySelector('.overlay');
const popupForm = popupOverlayEl.querySelector('.popup')
const popupName = popupOverlayEl.querySelector('input[name="name"]');
const popupProf = popupOverlayEl.querySelector('input[name="profession"]');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileProf = profile.querySelector(".profile__profession");

function openOverlay(popup, popupClass) {
  popup.classList.toggle(popupClass);
}

function closeOverlay(popup, popupClass) {
  popup.classList.remove(popupClass);
}

const openPopupOverlay = () => {
    if (!popupOverlayEl.classList.contains('overlay_open')) {
    popupName.value = profileName.textContent;
    popupProf.value = profileProf.textContent;
}
  openOverlay(popupOverlayEl, 'overlay_open');
}

popupOpenButton.addEventListener('click', openPopupOverlay);

popupCloseButton.addEventListener('click', openPopupOverlay);

function submitFormHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileProf.textContent = popupProf.value;

    closeOverlay(popupOverlayEl, 'overlay_open')
}

popupOverlayEl.addEventListener('submit', submitFormHandler);
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
  const placepopupOverlayEl = document.querySelector('.place-overlay');
  const placeForm = placepopupOverlayEl.querySelector('.place');
  const placeName = placepopupOverlayEl.querySelector('input[name="placeName"]');
  const placeUrl = placepopupOverlayEl.querySelector('input[name="placeUrl"]');
  const placeOpenButton = document.querySelector('.profile__add-button');
  const placeSaveButton = placepopupOverlayEl.querySelector('.place__add-button');
  const placeCloseButton = placepopupOverlayEl.querySelector('.place__close-button');

  const imgpopupOverlayEl = document.querySelector('.img-overlay');
  const imgForm = imgpopupOverlayEl.querySelector('.img-form');
  const imgName = imgpopupOverlayEl.querySelector('.img-form__title');
  const imgCloseButton = imgpopupOverlayEl.querySelector('.img-form__close-button');
  const imgPicture = imgpopupOverlayEl.querySelector('.img-form__picture');

function render() { //функция рендер карточек из массива
  initialCards.forEach(createPlace);
}

  function createPlace({name, link}) { //функция отрисовки карточек
  const copyPlace = placeTemplate.cloneNode(true);
  const placeTitle = copyPlace.querySelector('.element__title');
  const img = copyPlace.querySelector('.element__image');
  const likeButton = copyPlace.querySelector('.element__like');
  const btnDelete = copyPlace.querySelector('.element__delete');

  img.alt = name;
  placeTitle.textContent = name;
  img.src = link;

  btnDelete.addEventListener('click', handleDeleteCard); //кнопка удаления

  img.addEventListener("click", handleOpenPicture);//кнопка открытия картинки по нажатию на картинку

  likeButton.addEventListener("click", handleLikeActive);//кнопка лайк
  
  addCard(copyPlace);
  
  return copyPlace;//вставка на страницу
}

function addCard(element) {
    elementsTemplate.appendChild(element);
}

function createNewCard(evt) {//функция добавления новых карточек
  evt.preventDefault();
  createPlace({name: placeName.value, link: placeUrl.value});
  elementsTemplate.prepend(createPlace);
  closeOverlay(placepopupOverlayEl);
}

placepopupOverlayEl.addEventListener('submit', createNewCard);//кнопка сохранения новых карточек

placeOpenButton.addEventListener('click', openPlaceOverlay);//кнопка открытия попапа для создания новых карточек
placeCloseButton.addEventListener('click', closePlaceOverlay);//кнопка закрытия попапа для создания новых карточек

imgCloseButton.addEventListener('click', closeImgOverlay);//кнопка закрытия картинки

function openPlaceOverlay() {//функция открытия попапа для добавления картинок
  openOverlay(placepopupOverlayEl, 'place-overlay_open');
}

function closePlaceOverlay() {//функция закрытия попапа для добавления картинок
  closeOverlay(placepopupOverlayEl, 'place-overlay_open');
}

function closeImgOverlay() {//функция закрытия попапа для картинок
  closeOverlay(imgpopupOverlayEl, 'img-overlay_open');
}

const handleDeleteCard = (evt) => { //функция работы кнопки удаления
  evt.target.closest('.element').remove();
}

function handleOpenPicture(event) {//функция открытия картинки по нажатию на картинку
  const imgElementTg = event.target.closest('.element');
  imgPicture.src = event.target.src;
  imgName.textContent = imgElementTg.textContent;
  openOverlay(imgpopupOverlayEl, 'img-overlay_open');
}

function handleLikeActive(event) {//функция лайка
  event.target.classList.toggle('element__like_active');
}

render();
//Конец Place(Типа попапа, только для добавления новых картинок
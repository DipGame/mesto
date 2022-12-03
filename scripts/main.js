//Начало Попапа для редактирования профиля
const avatarOverlayEl = document.querySelector('.overlay_popup');
const overlayEl = document.querySelector('.overlay');
const avatarForm = avatarOverlayEl.querySelector('.popup')
const avatarName = avatarOverlayEl.querySelector('input[name="name"]');
const avatarProf = avatarOverlayEl.querySelector('input[name="profession"]');
const avatarOpenButton = document.querySelector('.profile__edit-button');
const avatarCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileProf = profile.querySelector(".profile__profession");

function openOverlay(popup) {
  popup.classList.add('overlay_open');
}

function closeOverlay(popup) {
  popup.classList.remove('overlay_open');
}

const openAvatarOverlay = () => {
    if (!avatarOverlayEl.classList.contains('overlay_open')) {
    avatarName.value = profileName.textContent;
    avatarProf.value = profileProf.textContent;
}
  openOverlay(avatarOverlayEl);
}

const closeAvatarOverlay = () => {
  closeOverlay(avatarOverlayEl);
}

avatarOverlayEl.onclick = function(event) {
  if (event.target === avatarOverlayEl) {
    closeAvatarOverlay();
  }
}

avatarOpenButton.addEventListener('click', openAvatarOverlay);

avatarCloseButton.addEventListener('click', closeAvatarOverlay);

function submitFormHandler (evt) {
    evt.preventDefault();

    profileName.textContent = avatarName.value;
    profileProf.textContent = avatarProf.value;

    closeOverlay(avatarOverlayEl);
}

avatarOverlayEl.addEventListener('submit', submitFormHandler);
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
  const placeavatarOverlayEl = document.querySelector('.overlay_place');
  const placeForm = placeavatarOverlayEl.querySelector('.place');
  const placeName = placeavatarOverlayEl.querySelector('input[name="placeName"]');
  const placeUrl = placeavatarOverlayEl.querySelector('input[name="placeUrl"]');
  const placeOpenButton = document.querySelector('.profile__add-button');
  const placeSaveButton = placeavatarOverlayEl.querySelector('.place__add-button');
  const placeCloseButton = placeavatarOverlayEl.querySelector('.place__close-button');

  const imgavatarOverlayEl = document.querySelector('.overlay_img');
  const imgForm = imgavatarOverlayEl.querySelector('.img-form');
  const imgName = imgavatarOverlayEl.querySelector('.img-form__title');
  const imgCloseButton = imgavatarOverlayEl.querySelector('.img-form__close-button');
  const imgPicture = imgavatarOverlayEl.querySelector('.img-form__picture');

  function escapePopup(event) {
  if (event.keyCode == '27') {
      closePlaceOverlay();
      closeImgOverlay();
      closeAvatarOverlay();
  }
}

  placeavatarOverlayEl.onclick = function(event) {
    if (event.target === placeavatarOverlayEl) {
      closePlaceOverlay();
    }
  }

  document.addEventListener('keydown', escapePopup);

  imgavatarOverlayEl.onclick = function(event) {
    if (event.target === imgavatarOverlayEl) {
      closeImgOverlay();
    }
  }

function render() { //функция рендер карточек из массива
  initialCards.forEach(addCard);
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
  
  return copyPlace;//вставка на страницу
}

function addCard({name, link}) { //функция прорисовки карточек 
    elementsTemplate.prepend(createPlace({name, link}));
}

function createNewCard(evt) {//функция добавления новых карточек
  evt.preventDefault();
  addCard({name: placeName.value, link: placeUrl.value});
  closeOverlay(placeavatarOverlayEl);
}

placeavatarOverlayEl.addEventListener('submit', createNewCard);//кнопка сохранения новых карточек

placeOpenButton.addEventListener('click', openPlaceOverlay);//кнопка открытия попапа для создания новых карточек
placeCloseButton.addEventListener('click', closePlaceOverlay);//кнопка закрытия попапа для создания новых карточек

imgCloseButton.addEventListener('click', closeImgOverlay);//кнопка закрытия картинки

function openPlaceOverlay() {//функция открытия попапа для добавления картинок
  openOverlay(placeavatarOverlayEl);
}

function closePlaceOverlay() {//функция закрытия попапа для добавления картинок
  closeOverlay(placeavatarOverlayEl);
}

function closeImgOverlay() {//функция закрытия попапа для картинок
  closeOverlay(imgavatarOverlayEl);
}

const handleDeleteCard = (evt) => { //функция работы кнопки удаления
  evt.target.closest('.element').remove();
}

function handleOpenPicture(event) {//функция открытия картинки по нажатию на картинку
  const imgElementTg = event.target.closest('.element');
  imgPicture.src = event.target.src;
  imgName.textContent = imgElementTg.textContent;
  openOverlay(imgavatarOverlayEl);
}

function handleLikeActive(event) {//функция лайка
  event.target.classList.toggle('element__like_active');
}

render();
//Конец Place(Типа попапа, только для добавления новых картинок
//Начало Попапа для редактирования профиля
const profileOverlayEl = document.querySelector('.overlay_popup');
const profilePopup = profileOverlayEl.querySelector('.popup')
const avatarName = profileOverlayEl.querySelector('input[name="name"]');
const avatarProf = profileOverlayEl.querySelector('input[name="profession"]');
const avatarOpenButton = document.querySelector('.profile__edit-button');
const avatarCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileProf = profile.querySelector(".profile__profession");

function handleEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.overlay_open')
   closeOverlay(openedPopup);
  }
}

function openOverlay(popup) {
  document.addEventListener('keydown', handleEscape);
  popup.classList.add('overlay_open');
}

function closeOverlay(popup) {
  document.addEventListener('keydown', handleEscape);
  popup.classList.remove('overlay_open');
}

const openAvatarOverlay = () => {
  avatarName.value = profileName.textContent;
  avatarProf.value = profileProf.textContent;
  openOverlay(profileOverlayEl);
}

const closeAvatarOverlay = () => {
  closeOverlay(profileOverlayEl);
}

profileOverlayEl.addEventListener('click', closeProfilePopup);

function closeProfilePopup(event) {
  if (event.target === profileOverlayEl) {
    closeOverlay(profileOverlayEl);
  }
}

avatarOpenButton.addEventListener('click', openAvatarOverlay);

avatarCloseButton.addEventListener('click', closeAvatarOverlay);

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = avatarName.value;
    profileProf.textContent = avatarProf.value;

    closeOverlay(profileOverlayEl);
}

profileOverlayEl.addEventListener('submit', handleProfileFormSubmit);
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
  const placeprofileOverlayEl = document.querySelector('.overlay_place');
  const placeForm = placeprofileOverlayEl.querySelector('.place');
  const placeName = placeprofileOverlayEl.querySelector('input[name="placeName"]');
  const placeUrl = placeprofileOverlayEl.querySelector('input[name="placeUrl"]');
  const placeOpenButton = document.querySelector('.profile__add-button');
  const placeSaveButton = placeprofileOverlayEl.querySelector('.place__add-button');
  const placeCloseButton = placeprofileOverlayEl.querySelector('.place__close-button');

  const imgprofileOverlayEl = document.querySelector('.overlay_img');
  const imgForm = imgprofileOverlayEl.querySelector('.img-form');
  const imgName = imgprofileOverlayEl.querySelector('.img-form__title');
  const imgCloseButton = imgprofileOverlayEl.querySelector('.img-form__close-button');
  const imgPicture = imgprofileOverlayEl.querySelector('.img-form__picture');

  placeprofileOverlayEl.addEventListener('click', closePlacePopup);

  function closePlacePopup(event) {
     if (event.target === placeprofileOverlayEl) {
    closeOverlay(placeprofileOverlayEl);
    }
}

imgprofileOverlayEl.addEventListener('click', closeImgPopup);

  function closeImgPopup(event) {
     if (event.target === imgprofileOverlayEl) {
    closeOverlay(imgprofileOverlayEl);
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
  closeOverlay(placeprofileOverlayEl);
}

placeprofileOverlayEl.addEventListener('submit', createNewCard);//кнопка сохранения новых карточек

placeOpenButton.addEventListener('click', openPlaceOverlay);//кнопка открытия попапа для создания новых карточек
placeCloseButton.addEventListener('click', closePlaceOverlay);//кнопка закрытия попапа для создания новых карточек

imgCloseButton.addEventListener('click', closeImgOverlay);//кнопка закрытия картинки

function openPlaceOverlay() {//функция открытия попапа для добавления картинок
  placeName.value = '';
  placeUrl.value = '';
  openOverlay(placeprofileOverlayEl);
}

function closePlaceOverlay() {//функция закрытия попапа для добавления картинок
  closeOverlay(placeprofileOverlayEl);
}

function closeImgOverlay() {//функция закрытия попапа для картинок
  closeOverlay(imgprofileOverlayEl);
}

const handleDeleteCard = (evt) => { //функция работы кнопки удаления
  evt.target.closest('.element').remove();
}

function handleOpenPicture(event) {//функция открытия картинки по нажатию на картинку
  const imgElementTg = event.target.closest('.element');
  imgPicture.src = event.target.src;
  imgPicture.alt = imgElementTg.textContent;
  imgName.textContent = imgElementTg.textContent;
  openOverlay(imgprofileOverlayEl);
}

function handleLikeActive(event) {//функция лайка
  event.target.classList.toggle('element__like_active');
}

render();
//Конец Place(Типа попапа, только для добавления новых картинок
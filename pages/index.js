import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

//Начало Попапа для редактирования профиля
const profileOverlayEl = document.querySelector('.overlay_popup');
const profileForm = profileOverlayEl.querySelector('.profileForm')
const avatarName = profileOverlayEl.querySelector('input[name="name"]');
const avatarProf = profileOverlayEl.querySelector('input[name="profession"]');
const avatarOpenButton = document.querySelector('.profile__edit-button');
const avatarCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileProf = profile.querySelector(".profile__profession");

const popupProf = new Popup(profileOverlayEl);

const openProfileOverlay = () => {
  const userInfo = new UserInfo(profileName, profileProf);
  userInfo.getUserInfo(avatarName, avatarProf);
  popupProf.open();
  popupProf.setEventListeners();
}

const closeProfileOverlay = () => {
  popupProf.close();
}

avatarOpenButton.addEventListener('click', openProfileOverlay);

avatarCloseButton.addEventListener('click', closeProfileOverlay);

const popupProfSumbit = new PopupWithForm(profileOverlayEl, {profileForm});

popupProfSumbit.setEventListeners(profileName, profileProf);

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
const formSelector = "#placeCardTemplate";
const placeprofileOverlayEl = document.querySelector('.overlay_place');
const placeForm = placeprofileOverlayEl.querySelector('.place');
const placeName = placeprofileOverlayEl.querySelector('input[name="placeName"]');
const placeUrl = placeprofileOverlayEl.querySelector('input[name="placeUrl"]');
const placeOpenButton = document.querySelector('.profile__add-button');
const placeSaveButton = placeprofileOverlayEl.querySelector('.place__add-button');
const placeCloseButton = placeprofileOverlayEl.querySelector('.place__close-button');

export const imgprofileOverlayEl = document.querySelector('.overlay_img');
const imgForm = imgprofileOverlayEl.querySelector('.img-form');
export const imgName = imgprofileOverlayEl.querySelector('.img-form__title');
const imgCloseButton = imgprofileOverlayEl.querySelector('.img-form__close-button');
export const imgPicture = imgprofileOverlayEl.querySelector('.img-form__picture');


const popupPlace = new Popup(placeprofileOverlayEl);

const popupPlaceSubmit = new PopupWithForm(placeprofileOverlayEl, {placeForm});

popupPlaceSubmit.setEventListeners(placeName, placeUrl);

function openPlaceOverlay() {//функция открытия попапа для добавления картинок
  popupPlace.open();
  popupPlace.setEventListeners();
}

function closePlaceOverlay() {//функция закрытия попапа для добавления картинок
  popupPlace.close();
}

const popupImg = new PopupWithImage(imgprofileOverlayEl);

const setCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, formSelector);
    const cardElement = card.getView();
    setCard.addItem(cardElement);
  }
}, elementsTemplate);

setCard.renderItems();

function createNewCard(evt) {//функция добавления новых карточек
  evt.preventDefault();
  console.log('hi');
  const cardPlace = new Card({ name: placeName.value, link: placeUrl.value }, formSelector);
  const cardElementPlace = cardPlace.getView();
  setCard.addItem(cardElementPlace)
  placeName.value = '';
  placeUrl.value = '';
  closePlaceOverlay();
}

placeprofileOverlayEl.addEventListener('submit', createNewCard);//кнопка сохранения новых карточек

placeOpenButton.addEventListener('click', openPlaceOverlay);//кнопка открытия попапа для создания новых карточек
placeCloseButton.addEventListener('click', closePlaceOverlay);//кнопка закрытия попапа для создания новых карточек

imgCloseButton.addEventListener('click', closeImgOverlay);//кнопка закрытия картинки

function closeImgOverlay() {//функция закрытия попапа для картинок
  popupImg.close();
}

export const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
};

const placeFormValidation = new FormValidator(enableValidation, placeForm);

const profileFormValidation = new FormValidator(enableValidation, profileForm);

placeFormValidation.enableValidationFunction();
profileFormValidation.enableValidationFunction();
//Конец Place(Типа попапа, только для добавления новых картинок
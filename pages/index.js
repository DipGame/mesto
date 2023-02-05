import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { profileOverlayEl, initialCards, placeprofileOverlayEl, imgprofileOverlayEl } from "../utils/constants.js";
import "./index.css";

//Начало Попапа для редактирования профиля
const profileForm = profileOverlayEl.querySelector('.profileForm')
const avatarName = profileOverlayEl.querySelector('input[name="name"]');
const avatarProf = profileOverlayEl.querySelector('input[name="profession"]');
const avatarOpenButton = document.querySelector('.profile__edit-button');
const avatarCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector(".profile__name");
const profileProf = profile.querySelector(".profile__profession");

const popupProfSubmit = new PopupWithForm(profileOverlayEl, {
  submitForm: () => {
    userInfo.setUserInfo(avatarName.value, avatarProf.value)
  },
  disableSubmitButton: () => {
    profileFormValidation.disableSubmit(popupSaveButton);
  }
});

const userInfo = new UserInfo({
  userName: profileName,
  userProfession: profileProf
})

const openProfileOverlay = () => {
  const profileInfo = userInfo.getUserInfo();
  avatarName.value = profileInfo.name;
  avatarProf.value = profileInfo.profession;
  popupProfSubmit.open();
}

avatarOpenButton.addEventListener('click', openProfileOverlay);

popupProfSubmit.setEventListeners();


const elementsTemplate = document.querySelector('.elements');
const placeTemplate = document.querySelector('.placeTemplate').content;
const formSelector = "#placeCardTemplate";
const placeForm = placeprofileOverlayEl.querySelector('.place');
const placeName = placeprofileOverlayEl.querySelector('input[name="placeName"]');
const placeUrl = placeprofileOverlayEl.querySelector('input[name="placeUrl"]');
const placeOpenButton = document.querySelector('.profile__add-button');
const placeSaveButton = placeprofileOverlayEl.querySelector('.place__add-button');
const placeCloseButton = placeprofileOverlayEl.querySelector('.place__close-button');


const imgForm = imgprofileOverlayEl.querySelector('.img-form');
const imgName = imgprofileOverlayEl.querySelector('.img-form__title');
const imgCloseButton = imgprofileOverlayEl.querySelector('.img-form__close-button');
const imgPicture = imgprofileOverlayEl.querySelector('.img-form__picture');

const popupPlaceSubmit = new PopupWithForm(placeprofileOverlayEl, {
  submitForm: () => { },
  disableSubmitButton: () => {
    placeFormValidation.disableSubmit(placeSaveButton);
  }
});

popupPlaceSubmit.setEventListeners();

function openPlaceOverlay() {//функция открытия попапа для добавления картинок
  popupPlaceSubmit.open();
}

const popupImg = new PopupWithImage(imgprofileOverlayEl, '.element');

function handleCardClick() {
  popupImg.open(imgName, imgPicture);
  popupImg.setEventListeners();
}

function getViewCard(items, selector, handlelick) {
  const card = new Card(items, selector, handlelick);
  const cardElement = card.getView();
  return cardElement;
}

const setCard = new Section({
  items: initialCards,
  renderer: (item) => {
    getViewCard(item, formSelector, handleCardClick);
    setCard.addItem(getViewCard(item, formSelector, handleCardClick));
  }
}, elementsTemplate);

setCard.renderItems();

function createNewCard(evt) {//функция добавления новых карточек
  evt.preventDefault();
  getViewCard({ name: placeName.value, link: placeUrl.value }, formSelector, handleCardClick);
  setCard.addItem(getViewCard({ name: placeName.value, link: placeUrl.value }, formSelector, handleCardClick));
  placeName.value = '';
  placeUrl.value = '';
}


placeprofileOverlayEl.addEventListener('submit', createNewCard);//кнопка сохранения новых карточек

placeOpenButton.addEventListener('click', openPlaceOverlay);//кнопка открытия попапа для создания новых карточек
// placeCloseButton.addEventListener('click', closePlaceOverlay);//кнопка закрытия попапа для создания новых карточек

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
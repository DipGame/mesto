import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileOverlayEl, initialCards, placeprofileOverlayEl, imgprofileOverlayEl, profileForm, avatarName, avatarProf, avatarOpenButton, popupSaveButton, profile, profileName, profileProf,
  elementsTemplate, formSelector, placeForm, placeName, placeUrl, placeOpenButton, placeSaveButton, imgName, imgPicture
} from "../utils/constants.js";
import "./index.css";


//Начало Попапа для редактирования профиля

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
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
// import "./index.css";

const popupProfSubmit = new PopupWithForm(profileOverlayEl, {
  submitForm: () => {
    userInfo.setUserInfo(avatarName, avatarProf)
  },
  disableSubmitButton: () => {
    profileFormValidation.disableSubmit();
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
  submitForm: () => {
    getViewCard({ name: placeName.value, link: placeUrl.value }, formSelector, handleCardClick);
    setCard.addItem(getViewCard({ name: placeName.value, link: placeUrl.value }, formSelector, handleCardClick));
    placeName.value = '';
    placeUrl.value = '';
  },
  disableSubmitButton: () => {
    placeFormValidation.disableSubmit();
  }
});

popupPlaceSubmit.setEventListeners();

function openPlaceOverlay() {
  popupPlaceSubmit.open();
}

const popupImg = new PopupWithImage(imgprofileOverlayEl, '.element');

popupImg.setEventListeners();

function handleCardClick(name, link) {
  popupImg.open(name, link);
}

function getViewCard(items, selector, handleCard) {
  const card = new Card(items, selector, handleCard);
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

placeOpenButton.addEventListener('click', openPlaceOverlay);

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
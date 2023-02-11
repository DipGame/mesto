import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileOverlayEl, dddd, placeprofileOverlayEl, imgprofileOverlayEl, profileForm, avatarButton, avatarName, avatarProf, avatarOpenButton, popupSaveButton, profile, profileName, profileProf,
  elementsTemplate, formSelector, placeForm, placeName, placeUrl, placeOpenButton, placeSaveButton, imgName, imgPicture,
  askOverlay, askForm, askYesButton, avatarOverlay, avatarForm, avatarUrl, elementLike
} from "../utils/constants.js";
import PopupWithAsk from "../components/PopupWithAsk.js";
import PopupWithAvatar from "../components/PopupWithAvatar.js";
import Api from "../components/Api.js";
import "./index.css";

const configApi = {
  url: "https://mesto.nomoreparties.co",
  headers: {
    authorization: '857bdf83-dc02-40c2-8f07-47f065018f5b',
    'Content-Type': 'application/json'
  },
}

const api = new Api(configApi);

api.getUserInfo(profileName, profileProf, avatarButton);

const avatarPopup = new PopupWithForm(avatarOverlay, {
  submitForm: () => {
    addBackgroundImg(avatarUrl);
    loading(true, askYesButton)
    api.createNewAvatar(avatarUrl)
    .finally(() => {
      loading(false, askYesButton);
    });
    avatarUrl.value = '';
  },
  disableSubmitButton: () => {
    avatarFormValidation.disableSubmit();
  }
});



avatarPopup.setEventListeners();

function addBackgroundImg(imgUrl) {
  avatarButton.style.backgroundImage = `url(${imgUrl.value})`
}

function openAvatarPopup() {
  avatarPopup.open();
}

avatarButton.addEventListener('click', openAvatarPopup);

const popupProfSubmit = new PopupWithForm(profileOverlayEl, {
  submitForm: () => {
    userInfo.setUserInfo(avatarName, avatarProf);
    loading(true, popupSaveButton)
    api.setUserInfo(profileName, profileProf)
    .finally(() => {
      loading(false, popupSaveButton);
    })
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
    setCard.addItem(getViewCard({ name: placeName.value, link: placeUrl.value, likes: "0", owner: '8dbbd03b548204150c9c45d0' }, formSelector, handleClick));
    loading(true, placeSaveButton)
    api.createNewCard(placeName, placeUrl)
      .finally(() => {
        loading(false, placeSaveButton);
      })
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

function handleClick(name, link) {
  popupImg.open(name, link);
}

function handleDeleteYes(id) {

}

function getViewCard({ name, link, _id, likes, owner }, selector, handleCard) {
  const card = new Card({
    name,
    link,
    handleDeleteCard: (id) => {
      handleDeleteCardServer(id)
    },
    handleLikeCardAddServer: (id) => {
      handleLikesPut(id)
    },
    handleLikesDeleteCard: (id) => {
      handleLikesDelete(id)
    },
    _id,
    likes,
    owner: owner._id
  }, selector,
    handleCard
  );
  const cardElement = card.getView(askOverlay);
  return cardElement;
}

function handleDeleteCardServer(id) { //функция удаления карточки с сервера
  api
    .deleteCards(id)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const askPopup = new PopupWithAsk(
  askOverlay)

askPopup.setEventListeners();

function renderCards() {
  api.getAllCards().then((data) => {
    setCard.renderItems(data);
  });
}

renderCards();

function loading(isLoading, element) {
  if (isLoading) {
    element.textContent = 'Сохранение...'
  } else {
    element.textContent = 'Сохранить'
  }
}

function handleLikesPut(id) { //функция лайка карточки на сервере
  api.likesAdd(id)
  .then((data) => {
    console.log(data);
  })
    .catch((error) => {
      console.log(error);
    });
}

function handleLikesDelete(id) { //функция удаления лайка карточки на сервере
  api.likesDelete(id)
  .then((data) => {
    console.log(data);
  })
    .catch((error) => {
      console.log(error);
    });
}



const setCard = new Section({
  renderer: (item) => {
    getViewCard(item, formSelector, handleClick);
    setCard.setItem(getViewCard(item, formSelector, handleClick));
  }
}, elementsTemplate);


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

const avatarFormValidation = new FormValidator(enableValidation, avatarForm);


avatarFormValidation.enableValidationFunction();
placeFormValidation.enableValidationFunction();
profileFormValidation.enableValidationFunction();
//Конец Place(Типа попапа, только для добавления новых картинок
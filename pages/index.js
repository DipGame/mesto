import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileOverlayEl, dddd, placeprofileOverlayEl, imgprofileOverlayEl, profileForm, avatarButton, avatarName, avatarProf, avatarOpenButton, popupSaveButton, profile, profileName, profileProf,
  elementsTemplate, formSelector, placeForm, placeName, placeUrl, placeOpenButton, placeSaveButton, imgName, imgPicture,
  askOverlay, askForm, askYesButton, avatarOverlay, avatarForm, avatarUrl, elementLike, configApi, avatarButtonForm, enableValidation
} from "../utils/constants.js";
import PopupWithAsk from "../components/PopupWithAsk.js";
import Api from "../components/Api.js";
import "./index.css";



export const api = new Api(configApi);

let userIdInfo;

const userInfo = new UserInfo({
  userName: profileName,
  userProfession: profileProf,
  userAvatar: avatarButton,
  _id: userIdInfo
});

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(value => {
    const user = value[0];
    userIdInfo = user._id;
    const card = value[1];
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id
    });
    setCard.renderItems(card);
  })
  .catch((err) => {
    console.log(err);
  });

const avatarPopup = new PopupWithForm(avatarOverlay, {
  submitForm: (el) => {
    loading(true, avatarButtonForm);
    api.createNewAvatar(el.avatarUrl)
      .then(() => {
        userInfo.setUserInfo({
          name: profileName.textContent,
          about: profileProf.textContent,
          avatar: el.avatarUrl
        });
        avatarPopup.close();
      })
      .finally(() => {
        loading(false, avatarButtonForm);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  disableSubmitButton: () => {
    avatarFormValidation.disableSubmit();
  }
});

avatarPopup.setEventListeners();

function openAvatarPopup() {
  avatarPopup.open();
}

avatarButton.addEventListener('click', openAvatarPopup);

const popupProfSubmit = new PopupWithForm(profileOverlayEl, {
  submitForm: (el) => {
    loading(true, popupSaveButton);
    api.setUserInfo(el.name, el.profession)
      .then(() => {
        userInfo.setUserInfo({
          name: el.name,
          about: el.profession,
          avatar: `url${avatarButton}`
        });
      })
      .finally(() => {
        loading(false, popupSaveButton);
      })
      .catch((error) => {
        console.log(error);
      });
    popupProfSubmit.close();
  },
  disableSubmitButton: () => {
    profileFormValidation.disableSubmit();
  }
});

const openProfileOverlay = () => {
  const infoObject = userInfo.getUserInfo();
  avatarName.value = infoObject.name.textContent;
  avatarProf.value = infoObject.about.textContent;
  popupProfSubmit.open();
}

avatarOpenButton.addEventListener('click', openProfileOverlay);

popupProfSubmit.setEventListeners();

const popupPlaceSubmit = new PopupWithForm(placeprofileOverlayEl, {
  submitForm: (el) => {
    loading(true, placeSaveButton);
    api.createNewCard(el.placeName, el.placeUrl)
      .then((res) => {
        setCard.addItem(getViewCard(res, formSelector, handleClick));
        popupPlaceSubmit.close();
      })
      .finally(() => {
        loading(false, placeSaveButton);
      })
      .catch((error) => {
        console.log(error);
      });
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



function getViewCard(data, selector, handleCard) {
  const card = new Card(
    data,
    {
      handleOpenPopupAsk: () => {
        askPopup.open();
        askPopup.addEventListener(() => {
          const id = card.getIdCard();
          api.deleteCards(id)
            .then(() => {
              card.deleteCard();
              askPopup.close();
            })
            .catch((error) => {
              console.log(error);
            });
        })
      },
      addDeleteLikeCard: () => {
        api.changeLikeCard(card.getIdCard(), card.checkUserLikeId())
          .then((res) => {
            card.handleLikeCard(res)
          })
          .catch((error) => {
            console.log(error);
          });
      },
      idUser: userIdInfo
    },
    selector,
    handleCard
  );
  const cardElement = card.getView();
  return cardElement;
}

export const askPopup = new PopupWithAsk(askOverlay)
askPopup.setEventListeners();

function loading(isLoading, element) {
  if (isLoading) {
    element.textContent = 'Сохранение...'
  } else {
    element.textContent = 'Сохранить'
  }
}

const setCard = new Section({
  renderer: (item) => {
    setCard.setItem(getViewCard(item, formSelector, handleClick));
  }
}, elementsTemplate);



placeOpenButton.addEventListener('click', openPlaceOverlay);

const placeFormValidation = new FormValidator(enableValidation, placeForm);

const profileFormValidation = new FormValidator(enableValidation, profileForm);

const avatarFormValidation = new FormValidator(enableValidation, avatarForm);


avatarFormValidation.enableValidationFunction();
placeFormValidation.enableValidationFunction();
profileFormValidation.enableValidationFunction();
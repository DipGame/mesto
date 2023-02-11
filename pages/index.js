import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileOverlayEl, dddd, placeprofileOverlayEl, imgprofileOverlayEl, profileForm, avatarButton, avatarName, avatarProf, avatarOpenButton, popupSaveButton, profile, profileName, profileProf,
  elementsTemplate, formSelector, placeForm, placeName, placeUrl, placeOpenButton, placeSaveButton, imgName, imgPicture,
  askOverlay, askForm, askYesButton, avatarOverlay, avatarForm, avatarUrl, elementLike, configApi, avatarButtonForm
} from "../utils/constants.js";
import PopupWithAsk from "../components/PopupWithAsk.js";
import Api from "../components/Api.js";
import "./index.css";



export const api = new Api(configApi);

api.getUserInfo(profileName, profileProf, avatarButton);



const avatarPopup = new PopupWithForm(avatarOverlay, {
  submitForm: (el) => {
    loading(true, avatarButtonForm);
    userInfo.setUserInfo({
      name: profileName.textContent,
      about: profileProf.textContent,
      avatar: el.avatarUrl
    });
    api.createNewAvatar(el.avatarUrl)
      .finally(() => {
        loading(false, avatarButtonForm);
      })
      .catch((error) => {
        console.log(error);
      });
    avatarUrl.value = '';
    avatarPopup.close();
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
    console.log(el)
    userInfo.setUserInfo({
      name: el.name,
      about: el.profession,
      avatar: `url${avatarButton}`
    });
    loading(true, popupSaveButton);
    api.setUserInfo(el.name, el.profession)
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

const userInfo = new UserInfo({
  userName: profileName,
  userProfession: profileProf,
  userAvatar: avatarButton,
})

const openProfileOverlay = () => {
  avatarName.value = profileName.name;
  avatarProf.value = profileProf.profession;
  popupProfSubmit.open();
}

avatarOpenButton.addEventListener('click', openProfileOverlay);

popupProfSubmit.setEventListeners();

const popupPlaceSubmit = new PopupWithForm(placeprofileOverlayEl, {
  submitForm: (el) => {
    loading(true, placeSaveButton);
    api.createNewCard(el.placeName, el.placeUrl)
      .then((res) => {
        console.log(res);
        setCard.addItem(getViewCard({
          name: res.name,
          link: res.link,
          likes: res.likes.length,
          owner: res.owner._id
        }, formSelector, handleClick));

        popupPlaceSubmit.close();
        formSelector.classList.add('.element__delete');
      })
      .finally(() => {
        loading(false, placeSaveButton);
      })
      .catch((error) => {
        console.log(error);
      });
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

function getViewCard({ name, link, _id, likes, owner }, selector, handleCard) {
  const card = new Card({
    name,
    link,
    handleLikeCardAddServer: (id) => {
      handleLikesPut(id)
    },
    handleOpenPopupAsk: () => {
      askPopup.open();
      askPopup.setEventListeners();
      askPopup.addEventListener(() => {
        const id = card.getIdCard();
        api.deleteCards(id)
          .then(() => {
            card.deleteCard();
            askPopup.close();
          })
      })
    },
    _id,
    likes,
    owner: owner._id
  }, selector,
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

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(value => {
    const user = value[0]
    const card = value[1];
    console.log(card)
    userInfo.getUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id
    });
    setCard.renderItems(card);
  })
  .catch(err => {
    console.log(err);
  });

const setCard = new Section({
  renderer: (item) => {
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
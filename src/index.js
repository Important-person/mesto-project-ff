import './index.css';
import {createCard, deleteCard, likeCard} from './components/createCard.js';
import { openModal, closeModal} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {getInitialCards, getUserInformation, postInitialCard, patchUserInformation, deleteCardApi, putLIkeCard, deleteLIkeCard, patchAvatar} from './components/api.js';

//глобальные переменные
//для создание карточки
const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.places__list');
let usedId;

//для открытия, закрытия и заполнения модального окна со сменой аватарки
const formAvatar = document.querySelector('.popup_type_new-avatar');
const formAvatarTemplate = formAvatar.querySelector('.popup__form');
const urlInput = document.querySelector('.popup__input_type_avatar');
const profileAvatar = document.querySelector('.profile__image');

const buttonOpenPopupAvetar = document.querySelector('.profile__image');
const buttonClosePopupAvetar = formAvatar.querySelector('.popup__close');
const buttonSubmitPopupAvetar = formAvatar.querySelector('.popup__button');

//для открытия, закрытия и заполнения модального окна с персональной информацией
const formProfile = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = formProfile.querySelector('.popup__close');
const buttonSubmitProfile = formProfile.querySelector('.popup__button');

//для открытия, закрытия и заполения модального окна добавления карточки
const formCard = document.querySelector('.popup_type_new-card');
const formCardTemplate = formCard.querySelector('.popup__form');
const titleInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

const buttonOpenCard = document.querySelector('.profile__add-button');
const buttonCloseCard = formCard.querySelector('.popup__close');
const buttonSubmitCard = formCard.querySelector('.popup__button');

//для открытия и закрытия режима просмотра изображения
const popupOpenImage = document.querySelector('.popup_type_image');
const buttoncloseImage = popupOpenImage.querySelector('.popup__close');
const captionPopup = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup__image');

//для валидации полей ввода 
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//для открытия и закрытия модального окна удаления карточки
const formDeleteCard = document.querySelector('.popup_type_delete-card');
const buttoncloseDeleteCard = formDeleteCard.querySelector('.popup__close');
let cardDeleted;
let elementCard;

//вызов функции валидации форм
enableValidation(validationConfig);

//вызов функции добавления карточек на страницу
window.addEventListener('load', () => {
    Promise.all([getInitialCards(), getUserInformation()])
        .then(([cards, userInformation]) => {
            usedId = userInformation._id
            cards.forEach(item => {
                content.append(createCard(item, item.owner._id, usedId, cardTemplate, openImage, openFormDeleteCard, handleLikeCard))
            });
            nameProfile.textContent = userInformation.name;
            descriptionProfile.textContent = userInformation.about;
            profileAvatar.style.backgroundImage = `url('${userInformation.avatar}')`
        })
        .catch((error) => {
            console.log(error);
        });
});

//вызов функции закрытия попапа заменя автарки
buttonClosePopupAvetar.addEventListener('click', () => closeModal(formAvatar));

//вызов функции открытие попапа замены автарки
buttonOpenPopupAvetar.addEventListener('click', () => {
    openModal(formAvatar);
    formAvatarTemplate.reset();
    clearValidation(formAvatar, validationConfig);
});

//функция замены аватарки
function replacementAvatar(evt) {
    evt.preventDefault();

    buttonSubmitPopupAvetar.textContent = 'Сохранение...';
    const url = urlInput.value;

    //замена аватарки пользователя на сервере
    patchAvatar(url)
        .then(() => {
            profileAvatar.style.backgroundImage = `url('${url}')`;
            closeModal(formAvatar);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            buttonSubmitPopupAvetar.textContent = 'Сохранение'
        })
};

//вызов функции замены аватарки
formAvatar.addEventListener('submit', replacementAvatar);

//вызов функции открытия попапа с персональными данными
buttonOpenProfile.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = descriptionProfile.textContent;

    openModal(formProfile);
    clearValidation(formProfile, validationConfig);
});

//вызов функции закрытие попапа персональных данных
buttonCloseProfile.addEventListener('click', () => closeModal(formProfile));

//функция заполнения формы персональных данных
function fillingFormProfile(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value

    buttonSubmitProfile.textContent = 'Сохранение...';

    //замена информации о пользователе на сервере
    patchUserInformation(name, job)
        .then(() => {
            nameProfile.textContent = name;
            descriptionProfile.textContent = job;
            closeModal(formProfile);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            buttonSubmitProfile.textContent = 'Сохранение'
        })
};

//заполнение формы персональных данных 
formProfile.addEventListener('submit', fillingFormProfile);

//вызов функции открытие попапа добавления карточки
buttonOpenCard.addEventListener('click', () => {
    openModal(formCard);
    formCardTemplate.reset();
    clearValidation(formCard, validationConfig)
});

//вызов функции закрытие попапа добавления карточки
buttonCloseCard.addEventListener('click', () => closeModal(formCard));

//функция добавления карточки
function addFormCreateCard(evt) {
    evt.preventDefault();

    buttonSubmitCard.textContent = 'Сохранение...';

    const src =  {
        name: titleInput.value,
        link: linkInput.value
    };

    //отправка карточки на сервер
    return (postInitialCard(src))
};

//вызов функции добавления карточки 
formCardTemplate.addEventListener('submit', (evt) => {
    addFormCreateCard(evt)
        .then(data => {
            content.prepend(createCard(data, data.owner._id, usedId, cardTemplate, openImage, openFormDeleteCard, handleLikeCard));
            closeModal(formCard);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            buttonSubmitCard.textContent = 'Сохранение'
        })
});

//функция просмотра изображения
function openImage(evt) {
    const altImage = evt.target.alt;
    const srcImage = evt.target.src;
    imagePopup.alt = altImage;
    imagePopup.src = srcImage;

    captionPopup.textContent = altImage;
    openModal(popupOpenImage)
};

//закрытие попапа image
buttoncloseImage.addEventListener('click', () => closeModal(popupOpenImage));

//функция закрытия попапа удаления карточки
buttoncloseDeleteCard.addEventListener('click', () => closeModal(formDeleteCard));

// Функция открытия попапа подтверждения удаления карточки
function openFormDeleteCard(card, cardElement) {
    cardDeleted = card;
    elementCard = cardElement;
    openModal(formDeleteCard);
};

// Функция удаления карточки на сервере и локально
function handleDeleteCard(cardElement) {
    deleteCardApi(cardDeleted._id)
        .then((data) => {
            deleteCard(cardElement);
            closeModal(formDeleteCard);
        })
        .catch((error) => {
            console.log(error);
        });
};

// слушатель события submit (удаления карточки)
formDeleteCard.addEventListener('submit', (event) => {
    event.preventDefault();

    handleDeleteCard(elementCard);
});

//функция проврки на лайк карточкек
function handleLikeCard(status, changeLike, event, idCard) { 
    if (!status(event)) {
        putLIkeCard(idCard)
        .then((data) => {
            changeLike(event, data)
        })
        .catch((error) => {
            console.log(error)
        })
    } else {
        deleteLIkeCard(idCard)
        .then((data) => {
            changeLike(event, data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
}











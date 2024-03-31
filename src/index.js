import './index.css';
import {createCard, deleteCard, likeCard} from './components/createCard.js';
import { openModal, closeModal} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {getInitialCards, getUserInformation, postInitialCard, patchUserInformation, deleteCardApi, putLIkeCard, deleteLIkeCard, patchAvatar} from './components/api.js';

//глобальные переменные
//для создание карточки
const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.places__list');

//для открытия, закрытия и заполнения модального окна со сменой аватарки
const formAvatar = document.querySelector('.popup_type_new-avatar');
const formAvatarTemplate = formAvatar.querySelector('.popup__form');

const openAvatarButton = document.querySelector('.profile__image');
const closeAvatarButton = formAvatar.querySelector('.popup__close');
const submitButtonAvatar = formAvatar.querySelector('.popup__button');

//для открытия, закрытия и заполнения модального окна с персональной информацией
const formProfile = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const openProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = formProfile.querySelector('.popup__close');
const submitButtonProfile = formProfile.querySelector('.popup__button');

//для открытия, закрытия и заполения модального окна добавления карточки
const formCard = document.querySelector('.popup_type_new-card');
const formCardTemplate = formCard.querySelector('.popup__form');

const openCardButton = document.querySelector('.profile__add-button');
const closeCardButton = formCard.querySelector('.popup__close');
const submitButtonCard = formCard.querySelector('.popup__button');

//для открытия и закрытия режима просмотра изображения
const popupImageOpen = document.querySelector('.popup_type_image');
const closeImageButton = popupImageOpen.querySelector('.popup__close');
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
const closeDeleteCard = formDeleteCard.querySelector('.popup__close');

//вызов функции валидации форм
enableValidation(validationConfig);

//вызов функции добавления карточек на страницу
window.addEventListener('load', () => {
    Promise.all([getInitialCards(), getUserInformation()])
        .then(([cards, userInformation]) => {
            cards.forEach(item => {
                content.append(createCard(item, deleteCard, cardTemplate, likeCard, openImage, deleteCardApi, putLIkeCard, deleteLIkeCard, formDeleteCardModal))
            });
            document.querySelector('.profile__title').textContent = userInformation.name;
            document.querySelector('.profile__description').textContent = userInformation.about;
            document.querySelector('.profile__image').style.backgroundImage = `url('${userInformation.avatar}')`
        })
        .catch((error) => {
            console.log(error);
        });
});

//вызов функции закрытия попапа заменя автарки
closeAvatarButton.addEventListener('click', () => closeModal(formAvatar));

//вызов функции открытие попапа замены автарки
openAvatarButton.addEventListener('click', () => {
    openModal(formAvatar);
    formAvatarTemplate.reset();
    clearValidation(formAvatar, validationConfig);
});

//функция замены аватарки
function replacementAvatar(evt) {
    evt.preventDefault();

    submitButtonAvatar.textContent = 'Сохранение...'
    const urlInput = document.querySelector('.popup__input_type_avatar').value;
    const profileAvatar = document.querySelector('.profile__image');

    profileAvatar.style.backgroundImage = `url('${urlInput}')`;
    closeModal(formAvatar);
    //замена аватарки пользователя на сервере
    patchAvatar(urlInput)
        .then(() => {
            submitButtonAvatar.textContent = 'Сохранение'
        })
        .catch((error) => {
            console.log(error);
            submitButtonAvatar.textContent = 'Сохранение'
        })
};

//вызов функции замены аватарки
formAvatar.addEventListener('submit', replacementAvatar);

//вызов функции открытия попапа с персональными данными
openProfileButton.addEventListener('click', () => {
    const nameProfile = document.querySelector('.profile__title').textContent;
    const descriptionProfile = document.querySelector('.profile__description').textContent;
    nameInput.value = nameProfile;
    jobInput.value = descriptionProfile;

    openModal(formProfile);
    clearValidation(formProfile, validationConfig);
});

//вызов функции закрытие попапа персональных данных
closeProfileButton.addEventListener('click', () => closeModal(formProfile));

//функция заполнения формы персональных данных
function fillingFormProfile(evt) {
    evt.preventDefault();

    submitButtonProfile.textContent = 'Сохранение...';
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    closeModal(formProfile);
    //замена информации о пользователе на сервере
    patchUserInformation(nameInput.value, jobInput.value)
        .then(() => {
            submitButtonProfile.textContent = 'Сохранение'
        })
        .catch((error) => {
            console.log(error);
            submitButtonProfile.textContent = 'Сохранение'
        })
};

//заполнение формы персональных данных 
formProfile.addEventListener('submit', fillingFormProfile);

//вызов функции открытие попапа добавления карточки
openCardButton.addEventListener('click', () => {
    openModal(formCard);
    formCardTemplate.reset();
    clearValidation(formCard, validationConfig)
});

//вызов функции закрытие попапа добавления карточки
closeCardButton.addEventListener('click', () => closeModal(formCard));

//функция добавления карточки
function addFormCreateCard(evt) {
    evt.preventDefault();

    submitButtonCard.textContent = 'Сохранение...';
    const titleInput = document.querySelector('.popup__input_type_card-name').value;
    const linkInput = document.querySelector('.popup__input_type_url').value;

    const src =  {
        name: titleInput,
        link: linkInput
    };

    closeModal(formCard);
    //отправка карточки на сервер
    return (postInitialCard(src))
};

//вызов функции добавления карточки 
formCardTemplate.addEventListener('submit', (evt) => {
    addFormCreateCard(evt)
        .then(data => {
            content.prepend(createCard(data, deleteCard, cardTemplate, likeCard, openImage, deleteCardApi, putLIkeCard, deleteLIkeCard, formDeleteCardModal));
            submitButtonCard.textContent = 'Сохранение'
        })
        .catch(error => {
            console.log(error);
            submitButtonCard.textContent = 'Сохранение'
        });
});

//функция просмотра изображения
function openImage(evt) {
    const altImage = evt.target.alt;
    const srcImage = evt.target.src;
    imagePopup.alt = altImage;
    imagePopup.src = srcImage;

    captionPopup.textContent = altImage;
    openModal(popupImageOpen)
};

//закрытие попапа image
closeImageButton.addEventListener('click', () => closeModal(popupImageOpen));

//функция закрытия попапа удаления карточки
closeDeleteCard.addEventListener('click', () => closeModal(formDeleteCard));

//функция обработки удаления карточки
function formDeleteCardModal(cardElement, deleteCard, idCard, deleteCardApi) {
    openModal(formDeleteCard);
    formDeleteCard.addEventListener('submit', (evt) => {
        evt.preventDefault();

        deleteCard(cardElement, idCard, deleteCardApi);
        closeModal(formDeleteCard)
    });
}








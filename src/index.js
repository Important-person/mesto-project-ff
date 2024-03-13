import './index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deliteCard, likeCard} from './components/createCard.js';
import { openModal, closeModal} from './components/modal.js';


//глобальные переменные
//для создание карточки
const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.places__list');

//для открытия, закрытия и заполнения модального окна с персональной информацией
const formProfile = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";

const openProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = formProfile.querySelector('.popup__close');

//для открытия, закрытия и заполения модального окна добавления карточки
const formCard = document.querySelector('.popup_type_new-card');
const formCardTemplate = formCard.querySelector('.popup__form');

const openCardButton = document.querySelector('.profile__add-button');
const closeCardButton = formCard.querySelector('.popup__close');

//для открытия и закрытия режима просмотра изображения
const popupImageOpen = document.querySelector('.popup_type_image');
const closeImageButton = popupImageOpen.querySelector('.popup__close');
const captionPopup = document.querySelector('.popup__caption');
const popupOpen = document.querySelector('.popup_type_image');
const imagePopup = document.querySelector('.popup__image');

//вызов функции создания и удаления карточки
initialCards.forEach( function (item) { 
   content.append(createCard(item, deliteCard, cardTemplate, likeCard, openImage))
});

//вызов цункции открытия попапа с персональными данными
openProfileButton.addEventListener('click', () => openModal(formProfile));

//вызов функции закрытие попапа персональных данных
//закрытие через крестик
closeProfileButton.addEventListener('click', () => closeModal(formProfile));

//функция заполнения формы персональных данных
export function handleFormSubmit(evt) {
    evt.preventDefault();

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    closeModal(formProfile);
    formElement.reset()
};

//заполнение формы персональных данных 
formElement.addEventListener('submit', handleFormSubmit);

//вызов функции открытие попапа добавления карточки
openCardButton.addEventListener('click', () => openModal(formCard));

//вызов функции закрытие попапа добавления карточки
closeCardButton.addEventListener('click', () => closeModal(formCard));

//функция добавления карточки
function addFormCreateCard(evt) {
    evt.preventDefault();

    const titleInput = document.querySelector('.popup__input_type_card-name').value;
    const linkInput = document.querySelector('.popup__input_type_url').value;

    let src =  {
        name: titleInput,
        link: linkInput
    };

    closeModal(formCard);
    formCardTemplate.reset();
    return src
};

//вызов функции создания карточки 
formCardTemplate.addEventListener('submit', (evt) => {
    const src = addFormCreateCard(evt);
    content.prepend(createCard(src, deliteCard, cardTemplate, likeCard, openImage));
});

//функция просмотра изображения
function openImage(evt) {
    const altImage = evt.target.alt;
    const srcImage = evt.target.src;
    imagePopup.alt = altImage;
    imagePopup.src = srcImage;

    captionPopup.textContent = altImage;
    popupOpen.classList.toggle('popup_is-opened');

    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closeModal(popupOpen)
        }
    });

    document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popupOpen)
        }
    });
};

//закрытие попапа image
closeImageButton.addEventListener('click', () => closeModal(popupOpen));








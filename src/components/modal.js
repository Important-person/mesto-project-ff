//функция закрытия попапа Esc
function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup)
    }
}

//Функция закрытия попапа Overlay
function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target)
    }
}


//Функция открытия попапа
export function openModal(item) {
    item.classList.toggle('popup_is-opened');

    if (item.classList.contains('popup_type_edit')) {
        const nameProfile = document.querySelector('.profile__title').textContent;
        const descriptionProfile = document.querySelector('.profile__description').textContent;
        item.querySelector('.popup__input_type_name').value = nameProfile;
        item.querySelector('.popup__input_type_description').value = descriptionProfile;
    };

    document.addEventListener('keydown', closePopupByEsc);

    document.addEventListener('click', closePopupByOverlay)
}

//Функция закрытия попапа
export function closeModal(item) {
    item.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closePopupByEsc);

    document.removeEventListener('click', closePopupByOverlay)
}

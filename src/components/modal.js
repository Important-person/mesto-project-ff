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

//функция открытия попапа
export function openModal(item) {
    item.classList.toggle('popup_is-opened');

    document.addEventListener('keydown', closePopupByEsc);

    document.addEventListener('click', closePopupByOverlay)
}

//Функция закрытия попапа
export function closeModal(item) {
    item.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closePopupByEsc);

    document.removeEventListener('click', closePopupByOverlay)
}

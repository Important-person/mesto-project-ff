//функция открытия попапа
export function openModal(item) {
    item.classList.toggle('popup_is-opened');

    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closeModal(item)
        }
    });

    document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(item)
        }
    });
}

//функция закрытия попапа
export function closeModal(item) {
    item.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', function(evt) {
        if (evt.key === 'Escape') {
            closeModal(item)
        }
    });

    document.removeEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(item)
        }
    });
}

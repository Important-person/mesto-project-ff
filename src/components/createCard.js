//функция создания карточки
export function createCard(item, currentUserId, usedId, cardTemplate, openImage, openFormDeleteCard, handleLikeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__numder-of-likes').textContent = item.likes.length;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (currentUserId == usedId) {
        deleteButton.addEventListener('click', () => openFormDeleteCard(item, cardElement));
    } else {
        deleteButton.remove();
    }

    const buttonLikeCard = cardElement.querySelector('.card__like-button');
    buttonLikeCard.addEventListener('click', event => {
        handleLikeCard(checkStatusLike, changeLike, event, item._id)
    })


    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', openImage);

    return cardElement
};

//удаление карточки
export function deleteCard(card) {
    card.remove()
};

//функция проверки лайка
function checkStatusLike(event) {
     return event.target.classList.contains('card__like-button_is-active')
};

//функция лайка в случае обработанного запроса
function changeLike(event, data) {
    event.target.classList.toggle('card__like-button_is-active');
    const cardElement = event.target.closest('.places__item');
    cardElement.querySelector('.card__numder-of-likes').textContent = data.likes.length
}



//функция создания карточки
export function createCard(item, deleteCard, cardTemplate, likeCard, openImage, deleteCardApi, putLIkeCard, deleteLIkeCard, formDeleteCardModal) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__numder-of-likes').textContent = item.likes.length;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (item.owner._id == "cc54880e5bc9fd87e1504901") {
        deleteButton.addEventListener('click', () => formDeleteCardModal(cardElement, deleteCard, item._id, deleteCardApi));
    } else {
        deleteButton.remove();
    }

    const likeCardButton = cardElement.querySelector('.card__like-button');
    likeCardButton.addEventListener('click', (event) => likeCard(event, item._id, putLIkeCard, deleteLIkeCard));


    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', openImage);

    return cardElement
};

//удаление карточки
export function deleteCard(cardElement, idCard, deleteCardApi) {
    deleteCardApi(idCard)
        .then((data) => {
            cardElement.remove()
        })
        .catch((error) => {
            console.log(error)
        })
};

//функция лайка карточки
export function likeCard(event, idCard, putLIkeCard, deleteLIkeCard) {
    if(!event.target.classList.contains('card__like-button_is-active')) {
        putLIkeCard(idCard)
            .then((data) => {
                event.target.classList.add('card__like-button_is-active');
                const cardElement = event.target.closest('.places__item');
                cardElement.querySelector('.card__numder-of-likes').textContent = data.likes.length
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        deleteLIkeCard(idCard)
        .then((data) => {
            event.target.classList.remove('card__like-button_is-active');
            const cardElement = event.target.closest('.places__item');
            cardElement.querySelector('.card__numder-of-likes').textContent = data.likes.length
        })
        .catch((error) => {
            console.log(error)
        })
    }
}



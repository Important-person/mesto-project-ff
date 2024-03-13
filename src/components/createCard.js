//функция создания карточки
export function createCard(item, deliteFunc, cardTemplate, likeCard, openImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deliteButton = cardElement.querySelector('.card__delete-button');
    deliteButton.addEventListener('click', deliteFunc);

    const likeCardButton = cardElement.querySelector('.card__like-button');
    likeCardButton.addEventListener('click', likeCard);


    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', openImage);

    return cardElement
};

//удаление карточки
export function deliteCard(evt) {
    const deliteElement = evt.target.closest('.places__item');
    deliteElement.remove()
};

//функция лайка карточки
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}



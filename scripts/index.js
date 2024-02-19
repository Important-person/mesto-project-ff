const cardTemplate = document.querySelector('#card-template').content;

const content = document.querySelector('.places__list');

initialCards.forEach( function (item) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deliteButton = cardElement.querySelector('.card__delete-button');
    deliteButton.addEventListener('click', deliteCard);

    content.append(cardElement);
});

function deliteCard(evt) {
    const deliteElement = evt.target.closest('.places__item');
    deliteElement.remove();
}

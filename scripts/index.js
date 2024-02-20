const cardTemplate = document.querySelector('#card-template').content;

const content = document.querySelector('.places__list');


function createCard(item, deliteFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deliteButton = cardElement.querySelector('.card__delete-button');
    deliteButton.addEventListener('click', deliteFunc);

    return cardElement;
};

initialCards.forEach( function (item) { 
   content.append(createCard(item, deliteCard));
});

function deliteCard(evt) {
    const deliteElement = evt.target.closest('.places__item');
    deliteElement.remove();
}

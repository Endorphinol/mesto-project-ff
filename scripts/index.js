// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const listCard = document.querySelector('.places__list');

function createCard(Card, deleteCard) {
    const templateList = document.querySelector('#card-template').content;
    const templateCard = templateList.querySelector('.card').cloneNode(true);
    templateCard.querySelector('.card__image').src = Card.link;
    templateCard.querySelector('.card__title').textContent = Card.name;
    templateCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return templateCard;
};

function deleteCard(evt) {
    const eventClick = evt.target;
    eventClick.parentElement.remove();
};

initialCards.forEach(function (item) {
    const newCard = createCard(item, deleteCard);
    listCard.append(newCard);
});




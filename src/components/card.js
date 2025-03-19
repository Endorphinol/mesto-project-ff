export function createCard(card, deleteCard, addLike, getUser, openPopupImage) {
    const templateList = document.querySelector('#card-template').content;
    const templateCard = templateList.querySelector('.card').cloneNode(true);
    const image = templateCard.querySelector('.card__image');
    const likesCount = templateCard.querySelector('.card__count');
    likesCount.textContent = card.likes.length;
    console.log(getUser)

    templateCard.querySelector('.card__title').textContent = card.name;
    templateCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    templateCard.querySelector('.card__like-button').addEventListener('click', addLike);

    if (getUser !== card.owner._id) {
        templateCard.querySelector('.card__delete-button').classList.remove('card__delete-button');
    }

    image.addEventListener('click', () => openPopupImage(card.link, card.name));
    image.src = card.link;
    image.alt = card.name;
    return templateCard;
};

export function deleteCard(evt) {
    const eventClick = evt.target;
    const buttonList = eventClick.closest('.card');
    buttonList.remove();
};

export function addLike(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
};

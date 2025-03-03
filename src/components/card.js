export function createCard(card, deleteCard, addLike, searchInfoAboutImgPopup) {
    const templateList = document.querySelector('#card-template').content;
    const templateCard = templateList.querySelector('.card').cloneNode(true);
    const image = templateCard.querySelector('.card__image');
    image.src = card.link;
    image.alt = card.name;
    templateCard.querySelector('.card__title').textContent = card.name;
    templateCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
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

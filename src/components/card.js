export function createCard(card, deleteCard, addLike, searchInfoAboutImgPopup, likeEventer) {
    const templateList = document.querySelector('#card-template').content;
    const templateCard = templateList.querySelector('.card').cloneNode(true);
    const image = templateCard.querySelector('.card__image');
    templateCard.querySelector('.card__title').textContent = card.name;
    templateCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    image.src = card.link;
    image.alt = card.name;
    return templateCard;
};

export function deleteCard(evt) {
    const eventClick = evt.target;
    const buttonList = eventClick.closest('.card');
    buttonList.remove();
};

likeButtons.forEach(function (item) { 
    item.addEventListener('click', addLike); 
}); 


export function addLike(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
};

item.addEventListener('click', addLike); 



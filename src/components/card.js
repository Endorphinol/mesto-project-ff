export function createCard(card, deleteCard, addLike, getUser, openPopupImage) {
    const templateList = document.querySelector('#card-template').content;
    const templateCard = templateList.querySelector('.card').cloneNode(true);
    const likeButton = templateCard.querySelector('.card__like-button');
    const image = templateCard.querySelector('.card__image');
    const likeCount = templateCard.querySelector('.card__count');
    likeCount.textContent = card.likes ? card.likes.length : 0;
    templateCard.querySelector('.card__title').textContent = card.name;
    templateCard.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(templateCard, card._id));
    templateCard.querySelector('.card__like-button').addEventListener('click', () => addLike(likeCount, likeButton, card._id));

    if (getUser !== card.owner._id) {
        templateCard.querySelector('.card__delete-button').classList.remove('card__delete-button');
    }

    image.addEventListener('click', function () {
        openPopupImage(card.link, card.name)
    });

    image.src = card.link;
    image.alt = card.name;
    return templateCard;
};

export function deleteCard(cardElement, idCard) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-35/cards/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea'
        }
    })
        .then(res => {
            if (res.ok) {
                cardElement.remove();
            }
        })
};

export function addLike(likeCount, likeButton, cardId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    fetch(`https://nomoreparties.co/v1/wff-cohort-35/cards/likes/${cardId}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: {
            authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            likeCount.textContent = data.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
}


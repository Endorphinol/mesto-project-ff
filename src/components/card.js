// Функция создания карточки.
export function createCard(card, deleteCard, addLike, userId, openPopupImage) {
    const templateList = document.querySelector('#card-template').content;
    const templateCard = templateList.querySelector('.card').cloneNode(true);
    const likeButton = templateCard.querySelector('.card__like-button');
    const image = templateCard.querySelector('.card__image');
    const likeCount = templateCard.querySelector('.card__count');
    likeCount.textContent = card.likes ? card.likes.length : 0;
    templateCard.querySelector('.card__title').textContent = card.name;
    templateCard.querySelector('.card__like-button').addEventListener('click', () => addLike(likeCount, likeButton, card._id)
        .then((data) => {
            likeCount.textContent = data.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((error) => {
            console.log('Ошибка', error);
        });
    );

    // Проверка идентификатора пользователя с остальными пользователями.
    if (userId !== card.owner._id) {
        templateCard.querySelector('.card__delete-button').classList.remove('card__delete-button');
    } else {
        templateCard.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(templateCard, card._id)
            .catch((error) => {
                console.log('Ошибка', error);
            })
        );
    };

    image.addEventListener('click', function () {
        openPopupImage(card.link, card.name)
    });

    image.src = card.link;
    image.alt = card.name;
    return templateCard;
};
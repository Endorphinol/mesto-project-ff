export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
        authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea',
        'Content-Type': 'application/json'
    }
}

// Проверка фотографии.
export const updatePhotoCheck = (url) => {
    return fetch(`${url.value}`, {
        method: 'HEAD',
    })
        .then(response => {
            if (!response.ok) {
                console.log('Произошла ошибка');
            }
            const contentType = response.headers.get('Content-Type');
            if (!contentType.startsWith('image/')) {
                console.log('URL не является картинкой')
            }
        })
        .catch((error) => {
            console.log('Ошибка', error);
        })
};

// Обновление фотографии пользователя на сайте.
export const updatePhoto = (newAvatarPhoto,
    buttonElement,
    closeModal,
    popupNewAvatar,
    Avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: `${newAvatarPhoto.value}`
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        })
        .then((data) => {
            Avatar.style.backgroundImage = `url(${data.avatar})`;
        })
        .finally(() => {
            buttonElement.textContent = "Сохранено";
            buttonElement.disabled = false;
            closeModal(popupNewAvatar);
        })
        .catch((error) => {
            console.log('Ошибка:', error);
        })
};

// Редактирование имени и деятельности пользователя на сайте.
export const updateProfile = (
    nameInput,
    jobInput,
    jobTitle,
    nameTitle,
    closeModal,
    popupEditProfile,
    buttonElement) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameInput.value,
            about: jobInput.value
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        })
        .then((data) => {
            nameTitle.textContent = data.name;
            jobTitle.textContent = data.about;
        })
        .finally(() => {
            buttonElement.textContent = "Сохранено"
            buttonElement.disabled = false;
            closeModal(popupEditProfile);
        })
        .catch((error) => {
            console.log('Ошибка', error);
        })
};

// Добавление карточки на сайт.
export const addCard = (buttonElement,
    closeModal,
    formAddCard,
    popupAddCard,
    createCard,
    deleteCard,
    addLike,
    openPopupImage,
    cardList) => {
    const item = {
        name: document.querySelector('.popup__input_type_card-name').value,
        link: document.querySelector('.popup__input_type_url').value,
    }
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: item.name,
            link: item.link,
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        })
        .then((data) => {
            const newCard = createCard(data, deleteCard, addLike, data.owner._id, openPopupImage);
            cardList.prepend(newCard);
        })
        .finally(() => {
            buttonElement.textContent = "Сохранено"
            buttonElement.disabled = false;
            formAddCard.reset();
            closeModal(popupAddCard);
        })
        .catch((error) => {
            console.log('Ошибка', error);
        })
};

// Загрузка информации о пользователе с сервера.
export const getUserData = (nameTitle, jobTitle) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: `${config.headers.authorization}`,
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        })
        .then((data) => {
            document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
            nameTitle.textContent = data.name;
            jobTitle.textContent = data.about;
            return data;
        })
        .catch((error) => {
            console.log('Ошибка', error);
        })
};

// Загрузка карточек с сервера.
export const getCreatesCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: `${config.headers.authorization}`,
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);

        })
        .then((data) => {
            return data;
        })
        .catch(() => {
            console.log('Ошибка', error);
        })
};
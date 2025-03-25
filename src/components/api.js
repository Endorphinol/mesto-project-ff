// Конфигурация для подставки идентификатора и токена.
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
        authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea',
        'Content-Type': 'application/json'
    }
};

// Функция для проверки обьекта ответа.
export const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
};

// Проверка фотографии для подтверждения.
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
                console.log('URL не является картинкой');
            }
        })
};

// Обновление фотографии пользователя на сайте.
export const updatePhoto = (newAvatarPhoto) => {
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
        .then(handleResponse)
};

// Редактирование имени и деятельности пользователя в профиле.
export const updateProfile = (nameData, aboutData,) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameData,
            about: aboutData,
        })
    })
        .then(handleResponse)
};

// Добавление карточки на сайт.
export const addCard = (nameCard, linkCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${config.headers.authorization}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameCard,
            link: linkCard,
        })
    })
        .then(handleResponse)
};

// Загрузка информации о пользователе с сервера.
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: `${config.headers.authorization}`,
        }
    })
        .then(handleResponse)
};

// Загрузка карточек с сервера.
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: `${config.headers.authorization}`,
        }
    })
        .then(handleResponse)
};

// Удаление карточки по нажатию.
export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: `${config.headers.authorization}`,
        }
    })
        .then(handleResponse)
};

// Функция добавления лайка на к арточку.
export const addLike = (cardId, currentLike) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: currentLike ? 'DELETE' : 'PUT',
        headers: {
            authorization: `${config.headers.authorization}`,
        }
    })
        .then(handleResponse)
};  

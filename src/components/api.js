// Обновление фотографии пользователя на сайте.
export const updatePhoto = formPhotoProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const buttonElement = formPhotoProfile.querySelector('.popup__button');
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;

    fetch(`${newAvatarPhoto.value}`, {
        method: 'HEAD',
    })
        .then(response => {
            if (!response.ok) {
                console.log('Произошла ошибка');
            }
            const contentType = response.headers.get('Content-Type')
            if (!contentType.startsWith('image/')) {
                console.log('URL не является картинкой')
            }
        })
        .catch((error) => {
            console.log('Ошибка', error);
        });

    fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea',
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
            return Promise.reject(`Ошибка: ${res.status}`);
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
});

// Редактирование имени и деятельности пользователя на сайте.
export const udpateProfile = formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;

    const buttonElement = formEditProfile.querySelector('.popup__button');
    buttonElement.textContent = "Сохранение..."
    buttonElement.disabled = true;

    fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea',
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
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            jobTitle.textContent = data.name;
            jobTitle.textContent = data.about;
        })
        .finally(() => {
            clearValidation(formAddCard, configValidation)
            buttonElement.textContent = "Сохранено"
            buttonElement.disabled = false;
            closeModal(popupEditProfile);
        })
        .catch((error) => {
            console.log('Ошибка', error);
        })
});

// Добавление карточки на сайт.
export const addCard = formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const buttonElement = formAddCard.querySelector('.popup__button');
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;

    const item = {
        name: document.querySelector('.popup__input_type_card-name').value,
        link: document.querySelector('.popup__input_type_url').value,
    }

    fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
        method: 'POST',
        headers: {
            authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea',
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
            return Promise.reject(`Ошибка: ${res.status}`);
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
});

// Загрузка информации о пользователе с сервера.
export const getUserData = fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'GET',
    headers: {
        authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea'
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
        document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
        nameTitle.textContent = data.name;
        jobTitle.textContent = data.about;
        return data;
    })
    .catch((error) => {
        console.log('Ошибка', error);
    });
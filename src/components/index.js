import '../pages/index.css';
import { createCard, deleteCard, addLike } from './card.js';
import { openModal, closeModal, closeModalOverlay } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new_avatar');
const newAvatarPhoto = document.querySelector('.popup__input_type_avatar');
const Avatar = document.querySelector('.profile__image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const formPhotoProfile = document.querySelector('.popup__form[name="new-avatar"]');
const popupImage = document.querySelector('.popup__image');
const popupImageOpen = document.querySelector('.popup_type_image');
const popupImageDescription = document.querySelector('.popup__caption');
const cardList = document.querySelector('.places__list');

/**
 * Объект опции:
 * 1. Элемент формы.
 * 2. Элемент поля ввода.
 * 3. Кнопка отправки формы.
 * 4. Класс для отключения кнопки.
 * 5. Класс для выделения попапа цветом.
 * 6. Класс для отображения попапа.
 */

const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Обновление фотографии пользователя на сайте.
formPhotoProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const buttonElement = formPhotoProfile.querySelector('.popup__button');
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;

    // fetch(`${newAvatarPhoto.value}`, {
    //     method: 'HEAD',
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             console.log('Произошла ошибка');
    //         }
    //         const contentType = response.headers.get('Content-Type')
    //         if (!contentType.startsWith('image/')) {
    //             console.log('URL не является картинкой')
    //         }
    //     })
    //     .catch((error) => {
    //         console.log('Ошибка,' error);
    //     });

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
            return response.json();
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
formEditProfile.addEventListener('submit', function (evt) {
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
            return response.json();
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

// Добавление карточки на сайте.
formAddCard.addEventListener('submit', function (evt) {
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
            return response.json();
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

// Открытие модального окна по нажатию на аватарку. 
Avatar.addEventListener('click', function () {
    clearValidation(formEditProfile, configValidation);
    openModal(popupNewAvatar);
})

// Открытие модального окна по нажатию на кнопку добавления карточки.
buttonAddCard.addEventListener('click', function () {
    clearValidation(formAddCard, configValidation);
    openModal(popupAddCard);
})

// Открытие модального кона по нажатию на кнопку редактирования карточки.
buttonEditProfile.addEventListener('click', function () {
    clearValidation(formEditProfile, configValidation);
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
    openModal(popupEditProfile);
});

// Поиск кнопки закрытия по всей странице для закрытия модального окна.
document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        const currentModal = evt.target.closest('.popup');
        closeModal(currentModal);
    }
});

// Открытие модального окна с изображением.
function openPopupImage(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupImageDescription.textContent = imageAlt;
    openModal(popupImageOpen);
};

// Закрытие модального окна по оверлею
document.addEventListener('click', closeModalOverlay);

enableValidation(configValidation);

// Загрузка информации о пользователе с сервера.
const getUserData = fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'GET',
    headers: {
        authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea'
    }
})
    .then((resolve) => {
        return resolve.json();
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

// Загрузка карточек с сервера.
const getCardsServer = fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
    method: 'GET',
    headers: {
        authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea'
    }
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch(() => {
        console.log('Ошибка', error);
    })

const promises = [getUserData, getCardsServer];

// Отображение карточек на сайте после получения информации от сервера и токена пользователя.
Promise.all(promises)
    .then(([userData, cardsServer]) => {
        const getUser = userData._id;
        cardsServer.forEach(function (item) {
            const newCard = createCard(item, deleteCard, addLike, getUser, openPopupImage);
            cardList.append(newCard);
        })
    })
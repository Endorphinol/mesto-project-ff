import '../pages/index.css';
import { createCard, deleteCard, addLike } from './card.js';
import { openModal, closeModal, closeModalOverlay } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { config, updatePhotoCheck, updatePhoto, updateProfile, addCard, getUserData, getCreatesCards } from './api.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new_avatar');
const Avatar = document.querySelector('.profile__image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const popupImage = document.querySelector('.popup__image');
const popupImageOpen = document.querySelector('.popup_type_image');
const popupImageDescription = document.querySelector('.popup__caption');
const cardList = document.querySelector('.places__list');
const formPhotoProfile = document.querySelector('.popup__form[name="new-avatar"]');
const newAvatarPhoto = document.querySelector('.popup__input_type_avatar');


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

// Обновление фотографии.
formPhotoProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const buttonElement = formPhotoProfile.querySelector('.popup__button');
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
    updatePhotoCheck(newAvatarPhoto);
    updatePhoto(newAvatarPhoto, buttonElement, closeModal, popupNewAvatar, Avatar);
});

// Редактирование профиля.
formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;

    const buttonElement = formEditProfile.querySelector('.popup__button');
    buttonElement.textContent = "Сохранение..."
    buttonElement.disabled = true;
    updateProfile(nameInput, jobInput, jobTitle, nameTitle, closeModal, popupEditProfile, buttonElement);
});

// Добавление карточки.
formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const buttonElement = formAddCard.querySelector('.popup__button');
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;

    addCard(buttonElement, closeModal, formAddCard, popupAddCard, createCard, deleteCard, addLike, openPopupImage, cardList)
});

const promises = [getUserData(nameTitle, jobTitle), getCreatesCards()];

// Отображение карточек на сайте после получения информации от сервера и токена пользователя.
Promise.all(promises)
    .then(([userData, getCreatesCards]) => {
        const getUser = userData._id;
        getCreatesCards.forEach(function (item) {
            const newCard = createCard(item, deleteCard, addLike, getUser, openPopupImage);
            cardList.append(newCard);
        })
    })
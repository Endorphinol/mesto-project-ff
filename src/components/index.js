import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, addLike } from './card.js';
import { openModal, closeModal, closeModalOverlay } from './modal.js';
import { isValid, showInputError, hideInputError, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, clearValidation } from './validation.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
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
/**
 * Объект опции
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
initialCards.forEach(function (item) {
    const newCard = createCard(item, deleteCard, addLike, openPopupImage);
    cardList.append(newCard);
});

buttonAddCard.addEventListener('click', function () {
    clearValidation(formAddCard, configValidation);
    openModal(popupAddCard);
})

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        const currentModal = evt.target.closest('.popup');
        closeModal(currentModal);
    }
});

buttonEditProfile.addEventListener('click', function () {
    clearValidation(formEditProfile, configValidation);
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
    openModal(popupEditProfile);
});

formEditProfile.addEventListener('submit', editProfile);

function editProfile(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;
    closeModal(popupEditProfile);
};

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {
        link: document.querySelector('.popup__input_type_url').value,
        name: document.querySelector('.popup__input_type_card-name').value
    };
    const newCard = createCard(item, deleteCard, addLike, openPopupImage);
    cardList.prepend(newCard);
    formAddCard.reset();
    clearValidation(formAddCard, configValidation);
    closeModal(popupAddCard);
});

function openPopupImage(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupImageDescription.textContent = imageAlt;
    openModal(popupImageOpen);
};

document.addEventListener('click', closeModalOverlay);


enableValidation(configValidation);


fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'GET',
    headers: {
        authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea'
    }
})
    .then(res => res.json())
    .then((result) => {
        document.querySelector('.profile__image').style.backgroundImage = `url(${result.avatar})`;
        document.querySelector('.profile__title').textContent = result.name;
        document.querySelector('.profile__description').textContent = result.about;
    });



fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', {
    method: 'GET',
    headers: {
        authorization: '08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea'
    }
})
    .then(res => res.json())
    .then((result) => {
    });
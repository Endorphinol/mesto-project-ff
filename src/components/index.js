import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, addLike } from './card.js';
import { openModal, closeModal } from './modal.js';

const listCard = document.querySelector('.places__list');

initialCards.forEach(function (item) {
    const newCard = createCard(item, deleteCard);
    listCard.append(newCard);
});

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const cardList = document.querySelector('.places__list');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const likeButtons = document.querySelectorAll('.card__like-button');
const showPopup = document.querySelector('.popup_type_image');
const popupDescription = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

buttonEditProfile.addEventListener('click', () => openModal(popupEditProfile));
buttonAddCard.addEventListener('click', () => openModal(popupAddCard));


cardList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__image')) {
        const cardList = document.querySelector('.popup_type_image')
        openModal(cardList);
    };
});

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        const currentModal = evt.target.closest('.popup');
        closeModal(currentModal);
    }
});

document.addEventListener('click', function (evt) {
    const currentModal = document.querySelector('.popup_is-opened');
    if (evt.target === currentModal) {
        closeModal(currentModal);
    }
});

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        const currentModal = document.querySelector('.popup_is-opened');
        if (currentModal) {
            closeModal(currentModal);
        }
    }
});

buttonEditProfile.addEventListener('click', function () {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;
    closeModal(popupEditProfile);
};

formEditProfile.addEventListener('submit', handleFormSubmit);

function addCard(value, url, addLike, showPhoto) {
    const template = document.querySelector('#card-template').content;
    const templateClone = template.querySelector('.card').cloneNode(true);
    templateClone.querySelector('.card__image').src = url;
    templateClone.querySelector('.card__title').textContent = value;
    templateClone.querySelector('.card__image').alt = value;
    cardList.prepend(templateClone);
    return templateClone;
};

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const addNewCardName = document.querySelector('.popup__input_type_card-name').value;
    const addNewCardUrl = document.querySelector('.popup__input_type_url').value;
    addCard(addNewCardName, addNewCardUrl);
    formAddCard.reset();
    closeModal(popupAddCard);
});

likeButtons.forEach(function (item) {
    item.addEventListener('click', addLike);
});

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__image')) {
        const imageSrc = evt.target.src;
        const imageAlt = evt.target.alt;
        openPopupImage(imageSrc, imageAlt);
    }
});

function openPopupImage(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupDescription.textContent = imageAlt;
    openModal(showPopup);
};
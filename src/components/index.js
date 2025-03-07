import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, addLike } from './card.js';
import { openModal, closeModal, closeModalOverlay } from './modal.js';

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

initialCards.forEach(function (item) {
    const newCard = createCard(item, deleteCard, addLike, openPopupImage);
    cardList.append(newCard);
});

buttonAddCard.addEventListener('click', () => openModal(popupAddCard));

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        const currentModal = evt.target.closest('.popup');
        closeModal(currentModal);
    }
});

buttonEditProfile.addEventListener('click', function () {
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
    closeModal(popupAddCard);
});

function openPopupImage(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupImageDescription.textContent = imageAlt;
    openModal(popupImageOpen);
};

document.addEventListener('click', closeModalOverlay);
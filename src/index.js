import './pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal, closeModalOverlay, closeModalEsc } from './modal.js';
import { createCard, deleteCard } from './card.js';

export const listCard = document.querySelector('.places__list');
export const modalOpenButton = document.querySelector('.profile__edit-button');
export const modalOpenButtonPlus = document.querySelector('.profile__add-button');
export const modalCloseButton = document.querySelector('.popup__close');
export const modalCloseOverlay = document.querySelector('.popup__content');
export const modalCards = document.querySelector('.places__list');
export const modalWindow = document.querySelector('.popup');
export const formElement = document.querySelector('.popup__form');
export const nameProfile = document.querySelector('.profile__title');
export const jobProfile = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');

modalOpenButton.addEventListener('click', openModal);
modalOpenButtonPlus.addEventListener('click', openModal);
modalCards.addEventListener('click', openModal);
document.addEventListener('click', closeModal);
document.addEventListener('click', closeModalOverlay);
document.addEventListener('keydown', closeModalEsc);

initialCards.forEach(function (item) {
    const newCard = createCard(item, deleteCard);
    listCard.append(newCard);
});

function makeDefaultValue() {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent; 
};

function openDefaultValue() {
    makeDefaultValue();
    modalWindow.style.display = 'flex';
};

modalOpenButton.addEventListener('click', openDefaultValue);
modalCards.addEventListener('click', openDefaultValue);
modalOpenButtonPlus.addEventListener('click', openDefaultValue);

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    modalWindow.style.display = 'none';
};

formElement.addEventListener('submit', handleFormSubmit); 


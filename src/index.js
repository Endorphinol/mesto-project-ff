import './pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal, closeModalOverlay, closeModalEsc } from './modal.js';
import { createCard, deleteCard } from './card.js';

const listCard = document.querySelector('.places__list');
export const modalOpenButton = document.querySelector('.profile__edit-button');
export const modalOpenButtonPlus = document.querySelector('.profile__add-button');
export const modalCloseButton = document.querySelector('.popup__close');
export const modalCards = document.querySelector('.places__list');
export const modalWindow = document.querySelector('.popup');
export const modalOverlay = document.querySelector('.popup_type_edit');

modalOpenButton.addEventListener('click', openModal);
modalOpenButton.addEventListener('click', closeModal);
modalOpenButton.addEventListener('click', closeModalOverlay);
modalOpenButton.addEventListener('keydown', closeModalEsc);
modalOpenButtonPlus.addEventListener('click', openModal);
modalOpenButtonPlus.addEventListener('click', closeModal);
modalOpenButtonPlus.addEventListener('click', closeModalOverlay);
modalOpenButtonPlus.addEventListener('keydown', closeModalEsc);
modalCards.addEventListener('click', openModal);
modalCards.addEventListener('click', closeModal);
modalCards.addEventListener('click', closeModalOverlay);
document.addEventListener('keydown', closeModalEsc);

initialCards.forEach(function (item) {
    const newCard = createCard(item, deleteCard);
    listCard.append(newCard);
});

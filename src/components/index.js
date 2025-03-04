import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, addLike } from './card.js';
import { openModal, closeModal, closeOverlay, closeModalEsc} from './modal.js';

const listCard = document.querySelector('.places__list');
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
const likeButtons = document.querySelectorAll('.card__like-button');
const showPopup = document.querySelector('.popup_type_image');
const popupDescription = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const cardList = document.querySelector('.places__list');

initialCards.forEach(function (item) {
    const newCard = createCard(item, deleteCard, addLike, openCardsPopup, searchInfoAboutImgPopup, likeEventer);
    listCard.append(newCard);
});

buttonAddCard.addEventListener('click', () => openModal(popupAddCard));
document.addEventListener('click', closeOverlay);

function openCardsPopup(evt) {
    if (evt.target.classList.contains('card__image')) {
        const cardList = document.querySelector('.popup_type_image')
        openModal(cardList);
    };
};

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

function editProfile(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;
    closeModal(popupEditProfile);
};

formEditProfile.addEventListener('submit', editProfile);

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault(); 
    const item = [{ 
        link: document.querySelector('.popup__input_type_url').value,
        name: document.querySelector('.popup__input_type_card-name').value; 
        }];
    item.forEach(function (item) {
        const newCard = createCard(item, deleteCard, addLike, openCardsPopup, searchInfoAboutImgPopup, likeEventer);
        cardList.prepend(newCard);
    });
    formAddCard.reset(); 
    closeModal(popupAddCard); 
}); 

likeButtons.forEach(likeEventer);

function likeEventer(item) {
    item.addEventListener('click', addLike);
};     

document.addEventListener('click', searchInfoAboutImgPopup);

function searchInfoAboutImgPopup(evt) {
    if (evt.target.classList.contains('card__image')) {
    const imageSrc = evt.target.src;
    const imageAlt = evt.target.alt;
    openPopupImage(imageSrc, imageAlt);
    }
};

function openPopupImage(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupDescription.textContent = imageAlt;
    openModal(showPopup);
};
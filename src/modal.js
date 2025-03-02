import { modalOpenButton, 
    modalOpenButtonPlus,
    modalCloseButton,
    modalCards,
    modalWindow,
    modalOverlay
} from './index';

export function openModal(evt) {
    if (openModal || evt.target.classList.contains('card__image')) {
        modalWindow.style.display = 'flex';
    }
};

export function closeModal() {
    modalCloseButton.addEventListener('click', function () {
        modalWindow.style.display = 'none';
    })
};

export function closeModalOverlay() {
    modalOverlay.addEventListener('click', function () {
        modalWindow.style.display = 'none';
    })
};

export function closeModalEsc(evt) {
    if (evt.key === 'Escape' && modalWindow.style.display === 'flex') {
        modalWindow.style.display = 'none';
        document.removeEventListener('keydown', closeModalEsc);
    }
};



import {
    modalOpenButton,
    modalOpenButtonPlus,
    modalCloseButton,
    modalWindow,
} from './index';

export function openModal(evt) {
    if (evt.target === modalOpenButton || evt.target === modalOpenButtonPlus || evt.target.classList.contains('card__image')) {
        modalWindow.style.display = 'flex';
        document.addEventListener('keydown', closeModalEsc);
    }
};

export function closeModal() {
    modalCloseButton.addEventListener('click', function () {
        modalWindow.style.display = 'none';
        document.removeEventListener('keydown', closeModalEsc);
    })
};

export function closeModalOverlay(evt) {
    if (evt.target === modalWindow) {
        modalWindow.style.display = 'none'; 
        document.removeEventListener('keydown', closeModalEsc);
    }
};

export function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
        modalWindow.style.display = 'none';
        document.removeEventListener('keydown', closeModalEsc);
    }
};
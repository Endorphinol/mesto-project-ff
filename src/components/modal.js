export function openModal(currentModal) {
    currentModal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
};

export function closeModal(currentModal) {
    currentModal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);

};

export function closeOverlay(evt) {
    const currentModal = document.querySelector('.popup_is-opened');
    if (evt.target === currentModal) {
        closeModal(currentModal);
    }
};

export function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
        const currentModal = document.querySelector('.popup_is-opened');
        if (currentModal) {
            closeModal(currentModal);
        }
    }
};


// Открыть модальное окно.
export function openModal(currentModal) {
    currentModal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEscape);
};
// Закрыть модальное окно.
export function closeModal(currentModal) {
    currentModal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEscape);

};
// Закрыть модальное окно по оверлею.
export function closeModalOverlay(evt) {
    const currentModal = document.querySelector('.popup_is-opened');
    if (evt.target === currentModal) {
        closeModal(currentModal);
    }
};
// Закрыть модальное окно по Escape.
export function closeModalEscape(evt) {
    if (evt.key === 'Escape') {
        const currentModal = document.querySelector('.popup_is-opened');
        if (currentModal) {
            closeModal(currentModal);
        }
    }
};


export function openModal(currentModal) {
    currentModal.classList.add('popup_is-opened', 'popup_is-animated');
};

export function closeModal(currentModal) {
    currentModal.classList.remove('popup_is-opened', 'popup_is-animated');
};

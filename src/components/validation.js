export const isValid = (formElement, inputElement, configValidation) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
    } else {
        hideInputError(formElement, inputElement, configValidation)
    }
};

export const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configValidation.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configValidation.inputErrorClass);
};

export const hideInputError = (formElement, inputElement, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(configValidation.inputErrorClass);
}

export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

export const toggleButtonState = (inputList, buttonElement, configValidation) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(configValidation.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(configValidation.inactiveButtonClass);
    }
};

export const setEventListeners = (formElement, configValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, configValidation);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, configValidation)
            toggleButtonState(inputList, buttonElement, configValidation);
        });
    });
};

export const enableValidation = (configValidation) => {
    const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, configValidation);
    });
};

/**
 * Функция очистки валидации формы и неактивности кнопки.
 * @param {string} form Добавляем форму.
 * @param {string} Object Добавляем объект конфигурации со всеми опциями.
 */

export function clearValidation(formElement, configValidation) {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);

    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(configValidation.errorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(configValidation.inputErrorClass);
    });

    buttonElement.disabled = true;
    buttonElement.classList.add(configValidation.inactiveButtonClass);
}

/**
 * Объект опции
 * 1. Элемент формы.
 * 2. Элемент поля ввода.
 * 3. Кнопка отправки формы.
 * 4. Класс для отключения кнопки.
 * 5. Класс для выделения попапа цветом.
 * 6. Класс для отображения попапа.
 */
export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

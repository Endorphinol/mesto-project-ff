// Проверка валидации.
export const isValid = (formElement, inputElement, configValidation) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
    } else {
        hideInputError(formElement, inputElement, configValidation);
    }
};

// Функция отображения ошибок валидации.
export const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configValidation.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configValidation.inputErrorClass);
};

// Функция скрытия ошибок валидации.
export const hideInputError = (formElement, inputElement, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(configValidation.inputErrorClass);
};

// Функция отключения кнопки.
const disableSubmitButton = (button, config) => {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
};

// Функция включения кнопок.
const enableSubmitButton = (button, config) => {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
};

// Проверка на не валидность хотя бы одного поля ввода.
export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Проверка на включение и выключение кнопки.
export const toggleButtonState = (inputList, buttonElement, configValidation) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, configValidation);
    } else {
        enableSubmitButton(buttonElement, configValidation);
    }
};

// Поиск всех полей ввода и кнопки обход всех полей ввода и добавление слушателей.
export const setEventListeners = (formElement, configValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, configValidation);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, configValidation);
            toggleButtonState(inputList, buttonElement, configValidation);
        });
    });
};

// Поиск всех форм на странице и передача их функции слушателю полей.
export const enableValidation = (configValidation) => {
    const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, configValidation);
    });
};

// Функция очистки полей валидации.
export function clearValidation(formElement, configValidation) {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, configValidation);
    });

    disableSubmitButton(buttonElement, configValidation);
};
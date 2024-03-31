//функция добавления текста и стилей при ошибке
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClassMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClassMessage);
}

//функция удаления текста и стилей при коректном вводе данных
function hideInputError(formElement, inputElement, inputErrorClass, errorClassMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClassMessage);
}
 
//функция проверки формы на валидность 
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClassMessage) {
    if (!inputElement.validity.valid) {
        if (inputElement.validity.patternMismatch) {
            showInputError(formElement, inputElement, inputElement.dataset.errorMessage, inputErrorClass, errorClassMessage);
        } else {
            showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClassMessage);
        }
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClassMessage);
    }
}


//функция проверки (все ли поля valid)
function hasInvalidInput(inputList) {

    return inputList.some((inputElement) => {

        return !inputElement.validity.valid;
    })
}

//функция блокировки кнопки submit
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if(hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

//функция запуска функции проверки на валидность на каждом из полей ввода input
function setEventListeners(formElement, formObject) {
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    const buttonElement = formElement.querySelector(formObject.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, formObject.inputErrorClass, formObject.errorClass);
            toggleButtonState(inputList, buttonElement, formObject.inactiveButtonClass);
        });
    });
}

//функция запуска валидации формы
export function enableValidation(formObject) {
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, formObject);
    });
}

//функция очистки валидации формы
export function clearValidation(profileForm, validationConfig) {
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        const errorElement = profileForm.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(validationConfig.errorClass);
    });

    if(profileForm.classList.contains('popup_type_new-card')) {
        buttonElement.setAttribute('disabled', '');
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}
"use strict"

const successDialog = document.getElementById('success-message');
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button')

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const queryTypeRadios = document.querySelectorAll('input[name="query-type"]');
const message = document.getElementById('message');
const agreement = document.getElementById('agreement');
    
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const queryError = document.getElementById('query-error');
const messageError = document.getElementById('message-error');
const agreementError = document.getElementById('agreement-error');

function showError(inputElement, errorElement) {
    if (inputElement.type !== 'radio' && inputElement.type !== 'checkbox') {
        inputElement.classList.add('input-invalid');
    }
    inputElement.setAttribute('aria-describedby', errorElement.id);
    errorElement.classList.remove('hidden');
}

function hideError(inputElement, errorElement) {
    if (inputElement.type !== 'radio') {
        inputElement.classList.remove('input-invalid');
    }
    inputElement.removeAttribute('aria-describedby');
    errorElement.classList.add('hidden');
}

function checkInput(nameElement, errorElement) {
    if (nameElement.value.trim() === '') {
        showError(nameElement, errorElement);
        return true;
    } else {
        hideError(nameElement, errorElement);
        return false;
    }
}

function checkEmail(emailElement, errorElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailElement.value)) {
        showError(emailElement, errorElement);
        return true;
    } else {
        hideError(emailElement, errorElement);
        return false;
    }
}

function queryCheck() {
    const queryTypeChecked = document.querySelector('input[name="query-type"]:checked');
    if (!queryTypeChecked) {
        showError(queryTypeRadios[0], queryError);
        return true;
    } else {
        hideError(queryTypeRadios[0], queryError);
        return false;
    }
}

function agreementCheck() {
    if (!agreement.checked) {
        showError(agreement, agreementError);
        return true;
    } else {
        hideError(agreement, agreementError);
        return false;
    }
}

function checkFormValid() {
    let isValid = true;
    if (checkInput(firstName, firstNameError)) {
        isValid = false;
    }
    if (checkInput(lastName, lastNameError)) {
        isValid = false;
    }
    if (checkInput(message, messageError)) {
        isValid = false;
    }
    if (checkEmail(email, emailError)) {
        isValid = false;
    }
    if (queryCheck()) {
        isValid = false;
    }
    if (agreementCheck()) {
        isValid = false;
    }
    return isValid;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isFormValid = checkFormValid();
    if (isFormValid) {
        form.reset();
        successDialog.showModal();
        setTimeout(() => {
            successDialog.close();
            
        }, 5000);
    }
});

submitButton.addEventListener('click', () => {
    checkFormValid();
})
"use strict"
//--------------------
import{
    errorMessages
}from './error_messages.js'

const phoneInput = document.getElementById('phone');
phoneInput.value = ' ';
const registrationButton = document.querySelector(".registration");
let currentLanguage = localStorage.getItem('language') || "en";

const maskOptions = {
  mask: '+{375} (00) 000-00-00',
  lazy: false
};
const mask = IMask(phoneInput, maskOptions);

function showError(field, errorText) {
    if (field.nextElementSibling && field.nextElementSibling.textContent === errorText) {
        return
    }

    field.classList.add("field_error");

    const err = document.createElement('span');
    field.after(err);
    err.classList.add("error_message");
    err.textContent = errorText;

    hideError(field, err);
}

function hideError(field, err) {
    field.addEventListener('input', () => {
        field.classList.remove("field_error");
        err.remove();
    })
}

document.querySelectorAll('input').forEach(el => {
    el.addEventListener('blur', () => {
        if (el.value.length === 0) {
            showError(el, errorMessages["required_field"][currentLanguage]);
        }
        else if (el.id == "phone") {
            if (mask.masked.isComplete) {
                if (phoneInput.nextElementSibling && phoneInput.nextElementSibling.textContent === "Обязательное поле") {
                    phoneInput.classList.remove("field_error");
                    phoneInput.nextElementSibling.parentNode.removeChild(phoneInput.nextElementSibling)
                }
            }
            else {
                if(!phoneInput.nextElementSibling){
                    showError(phoneInput, errorMessages["incorrect_number"][currentLanguage]);
                }
            }
        }
        else if (el.type == "email" && !(el.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))) {
            showError(el, errorMessages["incorrect_email"][currentLanguage]);
        }
    })
});



document.querySelector('.btn_send_in_modal').addEventListener('click', function (event) {
    event.preventDefault()
    console.log('click')
    if (checkValidation(document.querySelector('.input_fields_in_modal')) == true) {
        document.querySelector('.text_in_modal_for_user').style.display = "block";
        document.querySelector("input#phone").disabled = true;
        document.querySelector("input#email").disabled = true;
    }
})

document.querySelector('.btn_send_in_modal_2').addEventListener('click', function (event){
    event.preventDefault()
    console.log('click')
    if (checkValidation(document.querySelector('.input_fields_in_modal_2')) == true) {
        document.querySelector('.text_in_modal_for_admin').style.display = "block";
        document.querySelector("input#name").disabled = true;
        document.querySelector("input#address").disabled = true;
    }
})

function checkValidation(form) {

    let checkResult = true;

    form.querySelectorAll("input").forEach(input_element => {
        if(input_element.type == "checkbox"){
            return;
        }
        if (input_element.id == "phone") {
            if (!(mask.masked.isComplete)) {
                checkResult = false;
                console.log(phoneInput.nextElementSibling)
                if (!(phoneInput.nextElementSibling)) {
                    showError(input_element, errorMessages["required_field"][currentLanguage]);
                }
            }
        }
        // console.log(checkResult);
        if (input_element.value.length == 0) {
            checkResult = false
            if (!(input_element.nextElementSibling && input_element.nextElementSibling.textContent === "Обязательное поле")) {
                showError(input_element, errorMessages["required_field"][currentLanguage])
                checkResult = false;
            }
        }
        // console.log(checkResult);
        if (input_element.nextElementSibling && (input_element.nextElementSibling.tagName.toLowerCase() != 'button' && input_element.nextElementSibling.tagName.toLowerCase() != 'input')) {
            checkResult = false;
        }
        // console.log(input_element.nextElementSibling);
    })

    return checkResult;
}

const btnClear = document.querySelector(".button_clear_local_storage");
btnClear.addEventListener("click", () => {
    localStorage.clear();
})
"use strict"
//==========================================
import {
    errorMessages
} from "./error_messages.js";

var users = JSON.parse(localStorage.getItem("users")) || [];
var currentLanguage = localStorage.getItem("language") || "en";
var currentUser

function getUsers() {
    fetch("./registration/data/users.json")
        .then(response => response.json())
        .then((jsonData) => { return (users = jsonData.users) })
}

if (users.length == 0) {
    getUsers();
}

document.getElementById('registration_form').addEventListener('submit', function (event) {
    event.preventDefault()
    console.log(users)
    if (checkValidation(this) == true) {
        let first_field = document.querySelector(".input_log_in_data");
        let second_field = document.querySelector(".password");
        if (isUserInUsers(first_field.value, second_field.value)) {
            if (localStorage.getItem("users") == null) {
                localStorage.setItem("users", JSON.stringify(users));
            }
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            const previousPageUrl = document.referrer;
            if(previousPageUrl.includes('registration') && currentUser.role != "admin"){
                switchPageOnBasket();
            }
            else{
                switchPageOnHome();
            }
        }
        else {
            showError(second_field, errorMessages["uncorrect_date"][currentLanguage]);
        }
    }
})

function checkValidation(form) {
    let checkResult = true;

    form.querySelectorAll("input").forEach(input_element => {
        if (input_element.value.length == 0) {
            checkResult = false;
            if (!(input_element.nextElementSibling && input_element.nextElementSibling.textContent === "Обязательное поле")) {
                showError(input_element, errorMessages["required_field"][currentLanguage])
            }
        }
    })

    return checkResult;
}

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


function isUserInUsers(first_field, second_field) {
    for (let i = 0; i < users.length; i++) {
        let phone = String(users[i].telephone).replaceAll(" ", "").replaceAll("-", "").replace("(", "").replace(")", "");
        if (first_field == users[i].nick || first_field == phone || first_field == users[i].email) {
            if (second_field == users[i].password) {
                currentUser = users[i];
                return true;
            }
        }
    }
    return false;
}


function switchPageOnHome() {
    window.location.href = "./index.html";
}

function goBack(){
    window.history.back();
}

function switchPageOnBasket(){
    window.location.href = "./basket.html";
}

window.addEventListener('load', function() {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.classList.add('hide');
  });
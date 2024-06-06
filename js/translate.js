"use strict"
//==========================================
import {
    indexText,
    authorizationText,
    registrationText,
    adminPanelText,
    catalogText,
    basketText,
} from "./texts.js";


let currentLanguage = localStorage.getItem("language") || "en";
const langButtons = document.querySelectorAll("[data-btn]");
const currentPathName = window.location.pathname;
let currentTextObject = {};

function setNeedBtn() {
    langButtons.forEach(item => {
        if (item.dataset.btn == currentLanguage) {
            item.style.display = "none"
        }
        else {
            item.style.display = "block"
        }
    })
}

setNeedBtn();

function checkPagePathName() {
    console.log(currentPathName);

    if (currentPathName.includes("index.html")) {
        currentTextObject = indexText;
    }
    else if (currentPathName.includes("authorization.html")) {
        currentTextObject = authorizationText;
    }
    else if (currentPathName.includes("registration.html")) {
        currentTextObject = registrationText;
    }
    else if (currentPathName.includes("admin.html")) {
        currentTextObject = adminPanelText;
    }
    else if (currentPathName.includes("orders.html")) {
        currentTextObject = catalogText;
    }
    else if (currentPathName.includes("basket.html")) {
        currentTextObject = basketText;
    }
    else {
        currentTextObject = indexText;
    }
}

checkPagePathName();

function changeLang() {
    for (const key in currentTextObject) {
        const elems = document.querySelectorAll(`[data-lang=${key}]`);
        if (elems) {
            elems.forEach(item => {
                item.textContent = currentTextObject[key][currentLanguage];
            })
        }
    }
    if (currentPathName.includes("authorization.html")) {
        document.querySelector('.input_log_in_data').placeholder = currentTextObject["placeholder_1"][currentLanguage];
        document.querySelector('.password').placeholder = currentTextObject["placeholder_2"][currentLanguage];
    }
    if (currentPathName.includes("admin.html")) {
        document.querySelector(".input-field").placeholder = currentTextObject["placeholder_1"][currentLanguage];
    }
    if (currentPathName.includes("orders.html")) {
        document.querySelector(".input-field").placeholder = currentTextObject["placeholder"][currentLanguage];
    }
}

changeLang();

langButtons.forEach((btn => {
    btn.addEventListener('click', (event) => {
        currentLanguage = event.target.dataset.btn;
        localStorage.setItem('language', event.target.dataset.btn)
        reseatActiveClass(langButtons, 'header_btn_active')
        btn.classList.add('header_btn_active');
        changeLang();
        setNeedBtn();
    });
}));

function reseatActiveClass(arr, activeClass) {
    arr.forEach(elem => {
        elem.classList.remove(activeClass);
    })
}
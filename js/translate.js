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

const allLangs = ["ru", "en"];
let currentLanguage = localStorage.getItem("language") || "en";
const langButtons = document.querySelectorAll("[data-btn]");
const currentPathName = window.location.pathname;
let currentTextObject = {};

function setNeedBtn(){
    langButtons.forEach(item => {
        if(item.dataset.btn == currentLanguage){
            item.style.display = "none"
        }
        else{
            item.style.display = "block"
        }
    })
}

setNeedBtn();

function checkPagePathName(){
    switch(currentPathName){
        case "/index.html":
            currentTextObject = indexText;
            break;
        case "/authorization.html":
            currentTextObject = authorizationText;
            break;
        case "/registration.html":
            currentTextObject = registrationText;
            break;
        case "/admin.html":
            currentTextObject = adminPanelText;
            break;
        case "/orders.html":
            currentTextObject = catalogText;
            break;
        case "/basket.html":
            currentTextObject = basketText;
            break;
        default:
            currentTextObject = indexText;
            break;
    }
}

checkPagePathName();

function changeLang(){
    for (const key in currentTextObject) {
        const elems = document.querySelectorAll(`[data-lang=${key}]`);
        if(elems){
            elems.forEach(item =>{
                item.textContent = currentTextObject[key][currentLanguage];
            })
        }
    }
    if(currentPathName == '/authorization.html'){
        // console.log(currentTextObject["placeholder_1"][currentLanguage]);
        document.querySelector('.input_log_in_data').placeholder = currentTextObject["placeholder_1"][currentLanguage];
        document.querySelector('.password').placeholder = currentTextObject["placeholder_2"][currentLanguage];
    }
    if(currentPathName == '/admin.html'){
        document.querySelector(".input-field").placeholder = currentTextObject["placeholder_1"][currentLanguage];
    }
    if(currentPathName == "/orders.html"){
        document.querySelector(".input-field").placeholder = currentTextObject["placeholder"][currentLanguage];
    }
}

changeLang();

langButtons.forEach((btn =>{
    btn.addEventListener('click', (event) =>{
        currentLanguage = event.target.dataset.btn;
        localStorage.setItem('language', event.target.dataset.btn)
        reseatActiveClass(langButtons, 'header_btn_active')
        btn.classList.add('header_btn_active');
        changeLang();
        setNeedBtn();
    });
}));

function reseatActiveClass(arr, activeClass){
    arr.forEach(elem => {
        elem.classList.remove(activeClass);
    })
}
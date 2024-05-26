"use strict"
//==========================================
import {
    indexText
} from "./texts.js";

const allLangs = ["ru", "en"];
//let currentLanguage = localStorage.getItem("language") || "ru";
let currentLanguage = "en";
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
        case "./index.html":
            currentTextObject = indexText;
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
}

changeLang();

langButtons.forEach((btn =>{
    btn.addEventListener('click', (event) =>{
        currentLanguage = event.target.dataset.btn;
        //localStorage.setItem('language', event.target.dataset.btn)
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
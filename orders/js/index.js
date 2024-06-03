"use strict"
//==========================================
import {
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket,
    setUsersLocalStorage,
    setEmptyBasketLocalStorage,
    setUserLocalStorage,
} from './utils.js';

import {
    COUNT_SHOW_CARDS_CLICK,
    ERROR_SERVER_RU,
    NO_PRODUCTS_IN_THIS_CATEGORY_RU,
    ERROR_SERVER_EN, 
    NO_PRODUCTS_IN_THIS_CATEGORY_EN
} from './constants.js';

import {
    cardsText
} from './cards_title.js';

window.addEventListener('load', function() {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.classList.add('hide');
});

let temp = localStorage.getItem('currentUser');
let currentUser;
if(temp == null){
    localStorage.setItem('currentUser', 'unauthorized')
    currentUser = 'unauthorized';
}
else{
    if(temp == 'unauthorized'){
        currentUser = 'unauthorized';
    }
    else{
        currentUser = JSON.parse(temp);
    }
}

const cards = document.querySelector('.cards');
const btnCatalog = document.querySelector(".drop_button");
btnCatalog.addEventListener('click', buttonFunction)

let productsData = [];
await getProducts();
let viewProductsData = Array.from(productsData);
let filteredProducts = Array.from(productsData);

function translateCards(cards){
    let currentLanguage = localStorage.getItem('language') || "en";
    if(currentLanguage == "en"){
        cards.forEach(item => {
            item.title = cardsText[item.id + "Name"][currentLanguage];
        })
    }
}

async function getProducts() {
    try {
        if (!productsData.length) {
            const res = await fetch('./orders/data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            productsData = await res.json();
        }

        productsData.sort(() => Math.random() - 0.5);
        translateCards(productsData);
        renderStartPage(productsData);

    } catch (err) {
        let currentLanguage = localStorage.getItem("language") || "en"
        if(currentLanguage == "ru"){
            showErrorMessage(ERROR_SERVER_RU);
            return;
        }
        else{
            showErrorMessage(ERROR_SERVER_EN);
            return;
        }
    }
}

function renderStartPage(data) {
    if (!data || !data.length) {
        let currentLanguage = localStorage.getItem("language") || "en"
        if(currentLanguage == "ru"){
            showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY_RU);
            return;
        }
        else{
            showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY_EN);
            return;
        }
    }

    const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
    createCards(arrCards);

    checkingRelevanceValueBasket(data, currentUser);

    const basket = getBasketLocalStorage(currentUser);
    if(currentUser != "unauthorized"){

        currentUser.basket = basket;
        setUsersLocalStorage(currentUser);
        setUserLocalStorage(currentUser);
    }
    checkingActiveButtons(basket);

}

function createCards(data) {
    let currentLanguage = localStorage.getItem('language') || "en";
    document.querySelector(".cards").innerHTML = ""

    data.forEach(card => {
        const { id, img, title, price } = card;
        const cardItem =
            `
                <div class="card" data-product-id="${id}">
                    <div class="card_top">
                        <a class="card_image">
                            <img
                                src="./orders/data/${img}"
                                alt="${title}"
                            />
                        </a>
                    </div>
                    <div class="card_bottom">
                        <div class="card_prices">
                            <div class="card_price card_price--common"><span class = "text_price">${cardsText['price_text'][currentLanguage]}</span>${price}</div>
                        </div>
                        <a class="card_title">${title}</a>
                        <button class="card_add">${cardsText['inBasket_text_1'][currentLanguage]}</button>
                    </div>
                </div>
            `
        cards.insertAdjacentHTML('beforeend', cardItem);
    });
}

function handleCardClick(event) {
    const targetBtn = event.target.closest(".card_add");
    if (!targetBtn) return;

    const card = targetBtn.closest(".card");

    const id = card.dataset.productId;
    const basket = getBasketLocalStorage(currentUser);

    if (basket.includes(id)) return;

    basket.push(id);
    if(currentUser == "unauthorized"){
        setBasketLocalStorage(basket);
    }
    else{
        document.querySelector('.basket_count').textContent = basket.length;
        currentUser.basket = basket;
        setUsersLocalStorage(currentUser);
        setUserLocalStorage(currentUser);
        setEmptyBasketLocalStorage();
    }
    checkingActiveButtons(basket)
}

function checkingActiveButtons(basket) {
    let currentLanguage = localStorage.getItem('language') || "en";
    const buttons = document.querySelectorAll('.card_add');

    buttons.forEach(btn => {
        const card = btn.closest(".card");
        const id = card.dataset.productId;
        const isInBasket = basket.includes(id);

        btn.disabled = isInBasket;
        btn.classList.toggle('active', isInBasket);
        btn.textContent = isInBasket ? cardsText["inBasket_text_2"][currentLanguage] : cardsText["inBasket_text_1"][currentLanguage];
    })
}


const firstItemsButton = document.querySelector(".btn_first_items")
const previousItemButton = document.querySelector(".previous_items")
const nextItemsButton = document.querySelector(".btn_next_items")
const lastItemsButton = document.querySelector(".btn_last_items")

firstItemsButton.addEventListener('click', goToFirstPage);
previousItemButton.addEventListener('click', goToPreviousPage);
nextItemsButton.addEventListener('click', goToNextPage);
lastItemsButton.addEventListener('click', goToLastPage);


let currentPage = 1;

function goToFirstPage() {
    currentPage = 1;
    displayItems(viewProductsData);
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayItems(viewProductsData);
    }
}


function goToNextPage() {
    let totalItems = viewProductsData.length;
    // console.log(totalItems)
    if (currentPage * COUNT_SHOW_CARDS_CLICK < totalItems) {
        currentPage++;
        displayItems(viewProductsData);
    }
}
function goToLastPage() {
    let totalItems = viewProductsData.length;
    currentPage = Math.ceil(totalItems / COUNT_SHOW_CARDS_CLICK);
    displayItems(viewProductsData);
}

function displayItems(data) {
    const startIndex = (currentPage - 1) * COUNT_SHOW_CARDS_CLICK;
    const endIndex = startIndex + COUNT_SHOW_CARDS_CLICK;
    const itemsToDisplay = data.slice(startIndex, endIndex);
    document.querySelector('.number_num').textContent = currentPage;
    const basket = getBasketLocalStorage(currentUser);
    createCards(itemsToDisplay);
    checkingActiveButtons(basket)
}

function filterCards() {
    const searchText = document.querySelector('.input-field').value.toLowerCase();
    const filteredData = filteredProducts.reduce((acc, item) => {
        if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
            acc.push(item);
        }
        return acc;
    }, []);
    // console.log(filteredData)
    if (searchText == "") {
        viewProductsData = filteredProducts
        displayItems(viewProductsData);
        return;
    }
    if (filteredData.length == 0) {
        return;
    }
    viewProductsData = filteredData;
    currentPage = 1;
    displayItems(viewProductsData);
}

const searchInput = document.querySelector('.submit-button');
searchInput.addEventListener('click', filterCards);
const btnAddInBasket = document.querySelector(".cards");
btnAddInBasket.addEventListener("click", handleCardClick);

const pDropDownButton = document.querySelectorAll(".drop_down_text");

pDropDownButton.forEach((item) =>{
    item.addEventListener('click', getCategory)
})


function getCategory(event) {
    if(event.target.classList.contains("ddt_1")){
        filteredProducts = productsData;
    }
    else if(event.target.classList.contains("ddt_2")){
        filteredProducts = productsData.filter(item => item.type === 'burger');
    }
    else if(event.target.classList.contains("ddt_3")){
        filteredProducts = productsData.filter(item => item.type === 'drink');
    }
    else if(event.target.classList.contains("ddt_4")){
        filteredProducts = productsData.filter(item => item.type === 'pizza');
    }
    currentPage = 1;
    viewProductsData = filteredProducts;
    displayItems(filteredProducts);
}

function buttonFunction() {
    document.querySelector(".drop_down_content").classList.toggle("show_footer_menu");
    document.querySelector(".drop_button").classList.toggle("open");
}

window.onclick = function (event) {
    if (!event.target.matches('.drop_button')) {
        var dropdowns = document.getElementsByClassName("drop_down_content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show_footer_menu')) {
                openDropdown.classList.remove('show_footer_menu');
            }
        }
    }
}

// Получаем элементы DOM
const inputField = document.querySelector('.input-field');
const clearButton = document.querySelector('.clear-button');

// Добавляем обработчик событий на инпут поле
inputField.addEventListener('input', () => {
  // Если в поле есть текст, показываем крестик
  if (inputField.value.length > 0) {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
});

// Добавляем обработчик событий на крестик
clearButton.addEventListener('click', () => {
  // Очищаем значение инпут поля
  inputField.value = '';
  viewProductsData = filteredProducts
  displayItems(filteredProducts)
  // Скрываем крестик
  clearButton.style.display = 'none';
});
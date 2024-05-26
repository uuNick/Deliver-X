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
    ERROR_SERVER,
    NO_PRODUCTS_IN_THIS_CATEGORY
} from './constants.js';

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

async function getProducts() {
    try {
        if (!productsData.length) {
            const res = await fetch('../orders/data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            productsData = await res.json();
        }

        productsData.sort(() => Math.random() - 0.5)
        renderStartPage(productsData)

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err);
    }
}

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return;
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

    document.querySelector(".cards").innerHTML = ""

    data.forEach(card => {
        const { id, img, title, price } = card;
        const cardItem =
            `
                <div class="card" data-product-id="${id}">
                    <div class="card_top">
                        <a href="/card.html?id=${id}" class="card_image">
                            <img
                                src="./orders/data/${img}"
                                alt="${title}"
                            />
                        </a>
                    </div>
                    <div class="card_bottom">
                        <div class="card_prices">
                            <div class="card_price card_price--common">${price}</div>
                        </div>
                        <a href="/card.html?id=${id}" class="card_title">${title}</a>
                        <button class="card_add">В корзину</button>
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
    const buttons = document.querySelectorAll('.card_add');

    buttons.forEach(btn => {
        const card = btn.closest(".card");
        const id = card.dataset.productId;
        const isInBasket = basket.includes(id);

        btn.disabled = isInBasket;
        btn.classList.toggle('active', isInBasket);
        btn.textContent = isInBasket ? "В корзине" : "В корзину";
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
    console.log(totalItems)
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
    const filteredData = viewProductsData.reduce((acc, item) => {
        if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
            acc.push(item);
        }
        return acc;
    }, []);
    if (searchText == "") {
        viewProductsData = productsData
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
        viewProductsData = productsData;
    }
    else if(event.target.classList.contains("ddt_2")){
        viewProductsData = productsData.filter(item => item.type === 'burger');
    }
    else if(event.target.classList.contains("ddt_3")){
        viewProductsData = productsData.filter(item => item.type === 'drink');
    }
    else if(event.target.classList.contains("ddt_4")){
        viewProductsData = productsData.filter(item => item.type === 'pizza');
    }
    currentPage = 1;
    displayItems(viewProductsData);
}

function buttonFunction() {
    document.querySelector(".drop_down_content").classList.toggle("show_footer_menu");
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


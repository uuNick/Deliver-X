"use strict"
//==========================================
import { ERROR_SERVER, NO_ITEMS_CART } from './constants.js';
import {
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket,
    setUsersLocalStorage,
    setEmptyBasketLocalStorage,
    setUserLocalStorage
} from './utils.js';

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


const cart = document.querySelector('.cart');
let productsData = [];

await getProducts();
cart.addEventListener('click', delProductBasket);


cart.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart_minus')) {
        handleCartButtonClick(event.target, 'minus');
    } else if (event.target.classList.contains('cart_plus')) {
        handleCartButtonClick(event.target, 'plus');
    } else if (event.target.classList.contains('cart_count')) {
        handleCartCountChange(event.target);
    }
});

cart.addEventListener('input', (event) => {
    handleCartCountChange(event.target)
})

async function getProducts() {
    try {
        if (!productsData.length) {
            const res = await fetch('../orders/data/products.json');
            if (!res.ok) {
                console.log(1)
                throw new Error(res.statusText);
            }
            productsData = await res.json();
        }

        console.log(productsData)
        loadProductBasket(productsData)

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err);
    }
}

function loadProductBasket(data) {
    cart.textContent = '';

    if (!data || !data.length) {
        console.log(data)
        showErrorMessage(ERROR_SERVER);
        return;
    }

    checkingRelevanceValueBasket(data, currentUser);
    const basket = getBasketLocalStorage(currentUser);
    if(currentUser != "unauthorized"){

        currentUser.basket = basket;
        setUsersLocalStorage(currentUser);
        setUserLocalStorage(currentUser);
    }

    if (!basket || !basket.length) {
        showErrorMessage(NO_ITEMS_CART);
        return;
    }

    const findProducts = data.filter(item => basket.includes(String(item.id)));

    if (!findProducts.length) {
        showErrorMessage(NO_ITEMS_CART);
        return;
    }

    renderProductsBasket(findProducts);
}


function delProductBasket(event) {
    const targetButton = event.target.closest('.cart_del-card');
    if (!targetButton) return;

    const card = targetButton.closest('.cart_product');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage(currentUser);

    const newBasket = basket.filter(item => item !== id);
    if(currentUser == "unauthorized"){
        setBasketLocalStorage(newBasket);
    }
    else{
        document.querySelector('.basket_count').textContent = newBasket.length;
        console.log(currentUser)
        currentUser.basket = newBasket;
        setUsersLocalStorage(currentUser);
        setUserLocalStorage(currentUser);
        setEmptyBasketLocalStorage();
    }
    getProducts();
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, img, title, price } = card;
        const cardItem =
            `
        <div class="cart_product" data-product-id="${id}">
            <div class="cart_img">
                <img src="./orders/data/${img}" alt="${title}">
            </div>
            <div class="cart_title">${title}</div>
            <div class="cart_block-btns">
                <button class="cart_minus">-</button>
                <input type="number" class="cart_count" value="1" min="1" max="99">
                <button class="cart_plus">+</button>
            </div>
            <div class="cart_price">
                <span class = "cart_total_price">${price}</span>р
            </div>
            <div class="cart_del-card">X</div>
        </div>
        `;

        cart.insertAdjacentHTML('beforeend', cardItem);
    });
}


function handleCartButtonClick(target, action) {
    const cartProduct = target.closest('.cart_product');
    if (cartProduct) {
        const productId = cartProduct.dataset.productId;
        const cartCount = cartProduct.querySelector('.cart_count');
        const cartTotalPrice = cartProduct.querySelector('.cart_total_price');
        const price = parseFloat(cartTotalPrice.textContent);

        if (action === 'minus') {
            let count = parseInt(cartCount.value) || 0;
            if (count > 1) {
                count--;
                cartCount.value = count;
                updatePrice(productId, cartCount, cartTotalPrice, price);
            }
        } else if (action === 'plus') {
            let count = parseInt(cartCount.value) || 0;
            if (count < 99) {
                count++;
                cartCount.value = count;
                updatePrice(productId, cartCount, cartTotalPrice, price);
            }
        }
    }
}

function handleCartCountChange(target) {
    console.log("change")
    const cartProduct = target.closest('.cart_product');
    if (cartProduct) {
        const productId = cartProduct.dataset.productId;
        const cartCount = cartProduct.querySelector('.cart_count');
        const cartTotalPrice = cartProduct.querySelector('.cart_total_price');
        const price = parseFloat(cartTotalPrice.textContent);

        updatePrice(productId, cartCount, cartTotalPrice, price);
    }
}

function updatePrice(productId, countElement, priceElement) {
    let count = Math.min(Math.max(parseInt(countElement.value), 1), 99) || -1;
    const selectedProduct = productsData.find(product => String(product.id) === productId);
    if (count == -1) {
        countElement.value = '';
        count = 1
    }
    else{
        countElement.value = count;
    }
    priceElement.textContent = (parseFloat(selectedProduct.price) * count).toFixed(2);
}

const btnSend = document.querySelector(".btn-send");
btnSend.addEventListener('click', send);

function send(){
    let temp = localStorage.getItem('currentUser');
    let currentUser;
    if(temp == 'unauthorized'){
        currentUser = "unauthorized";
    }
    else{
        currentUser = JSON.parse(temp);
    }

    if(currentUser == 'unauthorized'){
        window.location.href = "./registration.html";
    }
}
"use strict"
//==========================================

// Вывод ошибки
export function showErrorMessage(message) {
    const div = document.querySelector('.wrapper')
    const msg =
        `<div class="error">
            <p>${message}</p>
            <p><a href="./orders.html">Перейти к списку товаров!</a></p>
        </div>`;
    div.insertAdjacentHTML('afterend', msg);
}

// Получение id из LS
export function getBasketLocalStorage(currentUser) {
    console.log(currentUser)
    if (currentUser == 'unauthorized') {
        const cartDataJSON = localStorage.getItem('basket');
        if (cartDataJSON) {
            let basket_items = JSON.parse(cartDataJSON)
            document.querySelector('.basket_count').textContent = basket_items.length;
            return basket_items;
        }
        return [];
    }
    else {
        let basket_items = currentUser.basket;
        if (basket_items.length == 0) {
            const cartDataJSON = localStorage.getItem('basket');
            if (cartDataJSON) {
                let basket_items = JSON.parse(cartDataJSON)
                document.querySelector('.basket_count').textContent = basket_items.length;
                return basket_items;
            }
            return [];
        }
        document.querySelector('.basket_count').textContent = basket_items.length;
        return basket_items;
    }
}

// Запись id товаров в LS
export function setBasketLocalStorage(basket) {
    const basketCount = document.querySelector('.basket_count');
    localStorage.setItem('basket', JSON.stringify(basket));
    basketCount.textContent = basket.length;
}

export function setEmptyBasketLocalStorage(){
    localStorage.setItem('basket', JSON.stringify([]));
}

// Проверка, существует ли товар указанный в LS 
export function checkingRelevanceValueBasket(productsData, currentUser) {
    const basket = getBasketLocalStorage(currentUser);

    basket.forEach((basketId, index) => {
        const existsInProducts = productsData.some(item => item.id === Number(basketId));
        if (!existsInProducts) {
            basket.splice(index, 1);
        }
    });

    if(currentUser == "unauthorized"){
        setBasketLocalStorage(basket);
    }
}

export function setUsersLocalStorage(updatedUser){
    let users;
    let temp = localStorage.getItem('users');
    if(temp == null){
        getUsers();
    }
    else{
        users = JSON.parse(temp);
    }
    const userToUpdate = users.find(user => user.nick === updatedUser.nick);
    userToUpdate.basket = updatedUser.basket;
    localStorage.setItem('users', JSON.stringify(users))
}

export function setUserLocalStorage(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getUsers() {
    fetch("./registration/data/users.json")
        .then(response => response.json())
        .then((jsonData) => { return (users = jsonData.users) })
}

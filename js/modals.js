const btnRegisterRestaurant = document.querySelectorAll('.button_register_restaurant');
const modalOverlay = document.querySelector('.modal_overlay');
const modalOverlay2 = document.querySelector('.modal_overlay_2');
const closeButton = document.querySelector(".close-button");
const closeButton2 = document.querySelector(".close-button-2");
const btnAddRest = document.querySelector('.button_add_restaurant');

btnRegisterRestaurant.forEach(item => item.addEventListener('click', () => {
    modalOverlay.classList.add('modal_overlay--visible');
    document.querySelector('.modal_1').classList.add('modal_1--visible');
    if(!(document.body.classList.contains('lock'))){
        document.body.classList.add('lock');
    }
}))

btnAddRest.addEventListener('click', ()=>{
    modalOverlay2.classList.add('modal_overlay--visible');
    document.querySelector(".modal_22").classList.add("modal_1--visible");
    document.body.classList.add('lock');
})

window.onclick = function (event) {
    if (event.target == modalOverlay || event.target == modalOverlay2) {
        modalOverlay.classList.remove('modal_overlay--visible');
        modalOverlay2.classList.remove('modal_overlay--visible');
        document.body.classList.remove('lock');
    }
}

closeButton2.onclick = function(){
    modalOverlay2.classList.remove('modal_overlay--visible');
    document.body.classList.remove('lock');
}

closeButton.onclick = function () {
    modalOverlay.classList.remove('modal_overlay--visible');
    document.body.classList.remove('lock');
}


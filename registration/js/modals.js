const userAgreementLink = document.querySelector('.license');
const modalOverlay = document.querySelector('.modal_overlay');
const closeButton = document.querySelector(".close-button");

userAgreementLink.addEventListener('click', () => {
    modalOverlay.classList.add('modal_overlay--visible');
    document.querySelector('.modal_1').classList.add('modal--visible');
})

window.onclick = function (event) {
    if (event.target == modalOverlay) {
        modalOverlay.classList.remove('modal_overlay--visible');
    }
}

closeButton.onclick = function () {
    modalOverlay.classList.remove('modal_overlay--visible');
}